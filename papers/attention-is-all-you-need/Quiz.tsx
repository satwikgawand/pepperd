import { QuizQuestion } from "@/types/paper"

export const questions: QuizQuestion[] = [
  {
    question: "what does self-attention replace in the transformer architecture?",
    options: ["convolutional layers", "recurrent connections", "feed-forward networks", "positional encodings"],
    answer: 1,
    explanation: "the transformer replaces recurrent connections (RNNs/LSTMs) with self-attention, enabling full parallelisation across sequence positions."
  },
  {
    question: "why do transformers need positional encodings?",
    options: [
      "to speed up training",
      "because attention can't handle long sequences",
      "because attention treats input as a set — it has no inherent sense of order",
      "to reduce the number of parameters"
    ],
    answer: 2,
    explanation: "self-attention sees all tokens at once without any notion of position. positional encodings inject order information so the model knows token 1 comes before token 2."
  },
  {
    question: "what does 'multi-head' in multi-head attention mean?",
    options: [
      "the model processes multiple sentences at once",
      "attention is computed multiple times in parallel across different representation subspaces",
      "there are multiple transformer layers stacked",
      "each token attends to multiple other tokens"
    ],
    answer: 1,
    explanation: "running attention multiple times in parallel (each 'head') lets the model capture different types of relationships — syntax, semantics, coreference — simultaneously."
  },
  {
    question: "the paper's main claim is that attention mechanisms alone are sufficient for sequence modelling. what evidence supports this?",
    options: [
      "transformers were tested on image classification",
      "the model achieved better translation quality than RNN-based models in less training time",
      "the architecture requires fewer layers than LSTMs",
      "attention weights are more interpretable than hidden states"
    ],
    answer: 1,
    explanation: "the transformer achieved state-of-the-art on WMT translation benchmarks while training significantly faster than recurrent alternatives — the quality gain and efficiency gain together made the case."
  }
]
