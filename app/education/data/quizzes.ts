export const quizzes = {
  gwt: [
    {
      theory: "gwt",
      prompt: "Which statement best reflects Global Workspace Theory?",
      options: [
        { value: "a", label: "Consciousness equals memory capacity." },
        { value: "b", label: "Consciousness occurs when information is globally broadcast across processors." },
        { value: "c", label: "Consciousness is only sensory inputs." },
      ],
      answer: "b",
      explanation:
        "GWT proposes that consciousness arises when information becomes globally available to multiple specialized brain systems, enabling coordinated behavior.",
      reference: "Baars, B. J. (1988). A Cognitive Theory of Consciousness.",
    },
    {
      theory: "gwt",
      prompt: "What is the 'global workspace' in GWT?",
      options: [
        { value: "a", label: "A physical location in the brain." },
        { value: "b", label: "A metaphorical space where information becomes available to multiple processors." },
        { value: "c", label: "The visual cortex." },
      ],
      answer: "b",
      explanation:
        "The global workspace is not a physical location but a functional concept describing how information is broadcast to multiple brain systems.",
      reference: "Baars, B. J. (2005). Global Workspace Theory of Consciousness.",
    },
  ],
  iit: [
    {
      theory: "iit",
      prompt: "What does Φ (phi) represent in Integrated Information Theory?",
      options: [
        { value: "a", label: "The speed of neural firing." },
        { value: "b", label: "Integrated information—a measure of consciousness." },
        { value: "c", label: "The number of neurons in the brain." },
      ],
      answer: "b",
      explanation:
        "Phi (Φ) quantifies the amount of integrated information in a system, which IIT proposes as the fundamental measure of consciousness.",
      reference: "Tononi, G. (2004). An Information Integration Theory of Consciousness.",
    },
    {
      theory: "iit",
      prompt: "According to IIT, can a system with zero integration be conscious?",
      options: [
        { value: "a", label: "Yes, always." },
        { value: "b", label: "No, consciousness requires integrated information." },
        { value: "c", label: "Only if it has many neurons." },
      ],
      answer: "b",
      explanation:
        "IIT posits that consciousness requires integrated information. A system with zero integration (Φ = 0) cannot be conscious.",
      reference: "Tononi, G., Boly, M., Massimini, M., & Koch, C. (2016). Integrated Information Theory.",
    },
  ],
  pp: [
    {
      theory: "pp",
      prompt: "What is the brain's primary function according to Predictive Processing?",
      options: [
        { value: "a", label: "To store memories." },
        { value: "b", label: "To minimize prediction error through hierarchical inference." },
        { value: "c", label: "To process sensory data passively." },
      ],
      answer: "b",
      explanation:
        "Predictive Processing frames the brain as an active prediction machine that constantly generates predictions and updates them based on prediction errors.",
      reference: "Friston, K. (2010). The Free-Energy Principle: A Unified Brain Theory.",
    },
    {
      theory: "pp",
      prompt: "What role do prediction errors play in Predictive Processing?",
      options: [
        { value: "a", label: "They are ignored by the brain." },
        { value: "b", label: "They drive learning and update internal models." },
        { value: "c", label: "They only occur in visual perception." },
      ],
      answer: "b",
      explanation:
        "Prediction errors signal mismatches between predictions and observations, driving the brain to update its internal models and improve future predictions.",
      reference:
        "Clark, A. (2013). Whatever Next? Predictive Brains, Situated Agents, and the Future of Cognitive Science.",
    },
  ],
} as const
