import pickle
import jax.tree_util

# Load and inspect parameters
with open('proto_agi_model_params.pkl', 'rb') as f:
    params = pickle.load(f)

def print_shapes(tree, prefix=""):
    leaves = jax.tree_util.tree_leaves(tree)
    for key, val in jax.tree_util.tree_flatten_with_path(tree)[0]:
        if hasattr(val, 'shape'):
            print(f"{prefix}{key}: {val.shape}")
        else:
            print(f"{prefix}{key}: {type(val)}")

print("Parameter structure:")
print_shapes(params)

print("\nDNC Cell parameters:")
if 'dnc_cell' in params:
    print_shapes(params['dnc_cell'], "  dnc_cell/")