import os
os.environ['JAX_PLATFORMS'] = 'cpu'
from flask import Flask, request, jsonify, render_template
import jax
import jax.numpy as jnp
import numpy as np
import pickle
from flax import linen as nn

# --- EXACT DNC Model Architecture ---
class DNCCell(nn.Module):
    hidden_size: int = 128
    memory_size: int = 20
    memory_vector_dim: int = 16
    num_read_heads: int = 2
    
    def setup(self):
        lstm_input_size = self.hidden_size + (self.memory_vector_dim * self.num_read_heads)
        self.input_projection = nn.Dense(lstm_input_size, name="input_projection")
        self.lstm = nn.OptimizedLSTMCell(features=self.hidden_size, name="lstm")
        
        interface_size = (self.memory_vector_dim * self.num_read_heads + 
                          self.memory_vector_dim + self.memory_vector_dim + 
                          self.num_read_heads * 3 + 3)  # add erase and add vectors sizes
        self.interface_layer = nn.Dense(interface_size, name="interface_layer")
        self.output_layer = nn.Dense(self.hidden_size, name="output_layer")

    def __call__(self, inputs, carry):
        lstm_state, memory, read_vectors = carry
        batch_size = inputs.shape[0]
        
        read_flat = read_vectors.reshape(batch_size, -1)
        controller_input = jnp.concatenate([inputs, read_flat], axis=-1)
        
        controller_input = self.input_projection(controller_input)
        lstm_state, controller_output = self.lstm(lstm_state, controller_input)

        interface = self.interface_layer(controller_output)
        
        # Parse interface vector into components (example parsing, adjust as per training)
        r_key_size = self.memory_vector_dim
        erase_size = self.memory_vector_dim
        add_size = self.memory_vector_dim
        num_read_heads = self.num_read_heads
        
        read_key = interface[:, :r_key_size]
        erase_vector = nn.sigmoid(interface[:, r_key_size:r_key_size + erase_size])
        add_vector = nn.tanh(interface[:, r_key_size + erase_size:r_key_size + erase_size + add_size])
        
        attention = nn.softmax(jnp.dot(read_key, memory.T), axis=-1)
        
        # Memory erase and add write
        # Calculate write weights - for simplicity, use attention as write weights here
        write_weights = attention
        
        erase = jnp.einsum('bn,bm->bnm', write_weights, erase_vector)  # batch outer product
        add = jnp.einsum('bn,bm->bnm', write_weights, add_vector)
        
        # Update memory
        memory = memory * (1 - erase.sum(axis=0)) + add.sum(axis=0)
        
        # New read vectors
        new_read = jnp.dot(attention, memory)
        new_read_vectors = jnp.tile(new_read.reshape(batch_size, 1, -1), (1, num_read_heads, 1))

        output = self.output_layer(jnp.concatenate([controller_output, new_read], axis=-1))

        # Debug print memory stats
        mem_np = np.array(memory)
        print(f"Memory at step: mean={mem_np.mean():.5f}, max={mem_np.max():.5f}, min={mem_np.min():.5f}")

        return output, (lstm_state, memory, new_read_vectors), {
            'attention': attention,
            'memory': memory,
            'read_vectors': new_read_vectors,
            'controller_output': controller_output,
            'interface': interface,
            'read_key': read_key,
            'erase_vector': erase_vector,
            'add_vector': add_vector,
            'write_weights': write_weights
        }

    def initialize_carry(self, rng, batch_size):
        lstm_input_size = self.hidden_size + (self.memory_vector_dim * self.num_read_heads)
        lstm_state = self.lstm.initialize_carry(rng, (batch_size, lstm_input_size))
        memory = jnp.zeros((self.memory_size, self.memory_vector_dim))
        read_vectors = jnp.zeros((batch_size, self.num_read_heads, self.memory_vector_dim))
        return lstm_state, memory, read_vectors



class DNCModel(nn.Module):
    input_size: int = 64
    hidden_size: int = 128
    
    @nn.compact
    def __call__(self, x, training=False):
        batch_size, seq_length, _ = x.shape
        
        input_layer = nn.Dense(self.hidden_size, name="input_layer")
        dnc_cell = DNCCell(hidden_size=self.hidden_size, name="dnc_cell")
        output_layer = nn.Dense(self.input_size, name="output_layer")

        x = input_layer(x)
        rng = self.make_rng('lstm') if training else jax.random.PRNGKey(0)
        carry = dnc_cell.initialize_carry(rng, batch_size)
        
        outputs = []
        states = []
        for t in range(seq_length):
            output, carry, state = dnc_cell(x[:, t], carry)
            outputs.append(output)
            states.append(state)
        
        outputs = jnp.stack(outputs, axis=1)
        final_output = output_layer(outputs)
        return final_output, states

# --- Flask App ---
app = Flask(__name__, template_folder='templates')
model = None
params = None

def load_model():
    global model, params
    model = DNCModel()
    print("Loading trained model parameters...")
    try:
        try:
            with open('proto_agi_model_params_trained.pkl', 'rb') as f:
                params = pickle.load(f)
            print("✓ Loaded from proto_agi_model_params_trained.pkl")
        except FileNotFoundError:
            with open('proto_agi_model_params.pkl', 'rb') as f:
                params = pickle.load(f)
            print("✓ Loaded from proto_agi_model_params.pkl")
        
        print(f"✓ Model loaded successfully")
    except Exception as e:
        print(f"✗ ERROR loading model: {e}")
        import traceback
        traceback.print_exc()
        params = None

def inference_with_visualization(params, input_tensor):
    key = jax.random.PRNGKey(0)
    output, states = model.apply({'params': params}, input_tensor, rngs={'lstm': key}, training=False)
    return output, states

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if params is None:
        return jsonify({'error': 'Model not loaded. Check server logs.'}), 500

    try:
        data = request.json
        input_numbers = np.array(data.get('numbers', []), dtype=np.float32)

        if len(input_numbers) == 0:
            return jsonify({'error': 'Input list cannot be empty.'}), 400

        seq_length = len(input_numbers)
        input_tensor = np.zeros((1, seq_length, 64), dtype=np.float32)
        input_tensor[0, :, 0] = input_numbers

        output_tensor, states = inference_with_visualization(params, input_tensor)
        output_numbers = output_tensor[0, :, 0].tolist()

        # Model-based sorting: input values ordered by their output signal (network's "sort")
        model_sort_indices = np.argsort(output_numbers)
        model_sorted = [float(input_numbers[idx]) for idx in model_sort_indices]

        timeline = []
        for t, state in enumerate(states):
            # Extract all possible DNC states for deep visualization
            attn = np.array(state['attention'][0])
            memory = np.array(state['memory'])
            read_vectors = np.array(state['read_vectors'][0])
            controller_out = np.array(state['controller_output'][0])
            interface = np.array(state['interface'][0])
            read_key = np.array(state['read_key'][0])

            # Build timeline state
            timeline.append({
                'timestep': int(t),
                'input': float(input_numbers[t]),
                'output': round(float(output_numbers[t]), 4),

                # Attention and memory
                'attention': attn.tolist(),  # 20 floats
                'attention_max': float(np.max(attn)),
                'memory_snapshot': memory.tolist(),  # 20x16 matrix
                'memory_means': [float(np.mean(row)) for row in memory],
                'memory_flat': memory.flatten().tolist(),

                # DNC controller vector info
                'controller_output': controller_out.tolist(),
                'controller_activation': float(np.mean(np.abs(controller_out))),
                'controller_activation_std': float(np.std(controller_out)),

                # Read details
                'read_vectors': read_vectors.tolist(),
                'read_vectors_flat': read_vectors.flatten().tolist(),
                'read_keys': read_key.tolist(),

                # Interface vector
                'interface': interface.tolist(),

                # Scalar summaries
                'summary': {
                    'mean_attention': float(np.mean(attn)),
                    'max_attention': float(np.max(attn)),
                    'min_attention': float(np.min(attn)),
                    'memory_max': float(np.max(memory)),
                    'memory_min': float(np.min(memory)),
                    'memory_mean': float(np.mean(memory)),
                },
            })

        response = {
            'input': [float(x) for x in input_numbers.tolist()],
            'output': [round(float(n), 4) for n in output_numbers],
            'model_sorted': model_sorted,
            'sequence_length': int(seq_length),
            'timeline': timeline
        }
        return jsonify(response)
    except Exception as e:
        print(f"Error during inference: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500



@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': params is not None,
        'version': '1.0'
    })

if __name__ == '__main__':
    load_model()
    print("\n" + "="*80)
    print("🧠 DNC Proto-AGI Consciousness Simulator")
    print("="*80)
    print("Open browser: http://localhost:8200")
    print("="*80 + "\n")
    
    app.run(debug=False, host='0.0.0.0', port=8200)