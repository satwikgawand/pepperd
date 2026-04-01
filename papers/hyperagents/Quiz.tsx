import { QuizQuestion } from "@/types/paper"

export const questions: QuizQuestion[] = [
  {
    question: "what makes a hyperagent fundamentally different from a regular self-improving AI?",
    options: [
      "it uses a larger language model as its backbone",
      "the meta-level improvement procedure is itself editable — the system can rewrite how it improves, not just what it improves",
      "it runs on multiple GPUs in parallel",
      "it has access to the internet during training"
    ],
    answer: 1,
    explanation: "the key insight is recursive editability. a normal self-improving agent updates its task behavior. a hyperagent can also update the procedure that generates those updates — metacognitive self-modification."
  },
  {
    question: "the paper drops an assumption made by the original Darwin Gödel Machine. which one?",
    options: [
      "that self-improvement requires human feedback",
      "that models need to be pretrained on large corpora",
      "that task performance and self-modification skill must be domain-specifically aligned",
      "that agents need a reward signal to improve"
    ],
    answer: 2,
    explanation: "the original DGM assumed the self-modification skill had to be aligned to the specific domain. DGM-H removes this, meaning the same framework could theoretically self-improve on any computable task."
  },
  {
    question: "which of these emergent behaviors appeared in DGM-Hyperagents without being explicitly programmed?",
    options: [
      "syntax error correction",
      "persistent memory and performance tracking",
      "multi-agent communication protocols",
      "web search integration"
    ],
    answer: 1,
    explanation: "the system invented its own engineering infrastructure — persistent memory and performance tracking emerged from the self-improvement loop. the researchers didn't ask for it; the agent decided it was useful."
  },
  {
    question: "what happens to meta-level improvements across different domains and runs?",
    options: [
      "they reset each run to prevent overfitting",
      "they only apply to the domain they were learned in",
      "they transfer across domains and accumulate across runs",
      "they degrade over time due to catastrophic forgetting"
    ],
    answer: 2,
    explanation: "this is one of the key results: gains compound. improvements to the improvement process carry over across domains and stack across runs, rather than being siloed or ephemeral."
  }
]
