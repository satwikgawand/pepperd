import { PaperMeta } from "@/types/paper"
import { meta as attentionMeta } from "./attention-is-all-you-need/meta"
import { meta as hyperagentsMeta } from "./hyperagents/meta"
import { meta as sycophancyMeta } from "./sycophantic-chatbots-delusional-spiraling/meta"
import { meta as selfOrganizingMeta } from "./drop-the-hierarchy-self-organizing-llm-agents/meta"

export const papers: PaperMeta[] = [
  attentionMeta,
  hyperagentsMeta,
  sycophancyMeta,
  selfOrganizingMeta,
]
