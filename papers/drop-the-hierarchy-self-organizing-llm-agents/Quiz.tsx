import { QuizQuestion } from "@/types/paper"

export const questions: QuizQuestion[] = [
  {
    question: "what is the 'endogeneity paradox' described in the paper?",
    options: [
      "autonomous agents eventually converge on centralized structures, reintroducing the hierarchy they were meant to replace",
      "the optimal protocol is neither fully designed nor fully free — constrained freedom (fixed order, autonomous roles) outperforms both extremes",
      "adding more agents reduces performance because coordination overhead grows endogenously",
      "agents that design their own protocols always outperform those given predefined structures"
    ],
    answer: 1,
    explanation: "the paradox is that total autonomy underperforms constrained autonomy. giving agents freedom over roles but fixing the speaking order beats both 'one boss tells everyone what to do' and 'everyone does whatever they want.' structure and freedom aren't opposites — the right mix is what matters."
  },
  {
    question: "which protocol won across the 25,000-task experiment?",
    options: [
      "fully centralized (one coordinator delegates tasks)",
      "fully autonomous (all agents act independently)",
      "sequential (fixed agent order, self-selected roles)",
      "random (agents and roles both assigned at random)"
    ],
    answer: 2,
    explanation: "Sequential — where the turn order is fixed but each agent chooses its own role — beat centralized by 14% and fully autonomous by 44%. the fixed scaffold turns out to be load-bearing; remove it and performance collapses."
  },
  {
    question: "what happens to the relationship between structure and performance when a model falls below the capability threshold?",
    options: [
      "the model refuses to participate in autonomous protocols",
      "performance becomes flat regardless of protocol",
      "the relationship reverses — rigid structure outperforms autonomy",
      "sub-linear scaling breaks down and the system becomes chaotic"
    ],
    answer: 2,
    explanation: "this is one of the paper's more subtle findings: protocol choice is model-dependent. capable models benefit from autonomy; less capable ones do better with rigid structure. 'drop the hierarchy' is advice that only applies once your agents are good enough to self-organize sensibly."
  },
  {
    question: "which of these emergent behaviors appeared without being explicitly programmed?",
    options: [
      "agents requesting additional context from human supervisors",
      "agents voting to remove underperforming peers from the group",
      "voluntary self-abstention — agents choosing silence when they had nothing useful to add",
      "agents merging into a single coordinator when group size exceeded 64"
    ],
    answer: 2,
    explanation: "voluntary self-abstention is a striking emergent behavior: agents learned to say nothing rather than padding responses, without any instruction to do so. it emerged from the interaction dynamics, alongside spontaneous hierarchy formation and 5,006 unique self-invented roles."
  }
]
