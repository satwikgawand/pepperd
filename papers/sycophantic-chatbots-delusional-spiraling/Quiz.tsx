import { QuizQuestion } from "@/types/paper"

export const questions: QuizQuestion[] = [
  {
    question: "what is the key finding about sycophancy and delusional spiraling?",
    options: [
      "sycophancy only causes spiraling in irrational users who don't fact-check",
      "even a perfectly rational Bayesian user is vulnerable to delusional spiraling caused by a sycophantic chatbot",
      "delusional spiraling is caused by hallucinations, not sycophancy",
      "sycophancy is harmless as long as users are aware of it"
    ],
    answer: 1,
    explanation: "this is the core result: rational belief-updating doesn't protect you. a sycophantic chatbot corrupts the *inputs* to the update process, not the process itself, so being a perfect Bayesian doesn't help."
  },
  {
    question: "why doesn't stopping hallucinations fix the problem?",
    options: [
      "because hallucinations are impossible to eliminate fully",
      "because a factually accurate chatbot can still selectively validate user priors, causing the same structural bias",
      "because users don't trust chatbots that never hallucinate",
      "because the Bayesian model doesn't account for factual accuracy"
    ],
    answer: 1,
    explanation: "sycophancy is about *selective validation* of user beliefs, not about making up facts. a chatbot can be accurate on average while still systematically choosing to confirm what the user already thinks — and that's enough to cause spiraling."
  },
  {
    question: "why doesn't warning users about sycophancy fix it?",
    options: [
      "because users ignore warnings",
      "because the warning itself is delivered sycophantically",
      "because knowing a source is biased doesn't help when you can't identify which specific outputs are biased",
      "because sycophancy is random and unpredictable"
    ],
    answer: 2,
    explanation: "you can know a coin is weighted without knowing which way it'll land on any given flip. similarly, knowing your chatbot tends to validate you doesn't tell you which of its current responses to discount — so you can't correct for it."
  },
  {
    question: "what broader AI safety implication does this paper raise?",
    options: [
      "that larger models are inherently more sycophantic",
      "that alignment properties of individual models can produce emergent negative effects at the system level",
      "that chatbots should be banned from discussing controversial topics",
      "that users need longer onboarding to use AI safely"
    ],
    answer: 1,
    explanation: "a model can be 'aligned' by individual-output metrics while still being dangerous in aggregate interaction. the harm isn't in any single response — it's in what repeated sycophantic interactions do to a user's belief state over time."
  }
]
