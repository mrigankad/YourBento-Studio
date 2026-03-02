// ─── LOTTIE ASSET REGISTRY ──────────────────────────────────────────────────
// Maps LottieId to the actual JSON animation data

import type { LottieId } from "../../types";

import scheduleAnim from "../../assets/woman-making-work-plans-or-marking-schedules.json";
import targetAnim from "../../assets/business-target.json";
import checklistAnim from "../../assets/work-checklist.json";
import contractAnim from "../../assets/approval-contract.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LOTTIE_REGISTRY: Record<string, any> = {
    schedule: scheduleAnim,
    target: targetAnim,
    checklist: checklistAnim,
    contract: contractAnim,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLottie(id: LottieId): any {
    if (id === "none") return null;
    return LOTTIE_REGISTRY[id] ?? null;
}

export default LOTTIE_REGISTRY;
