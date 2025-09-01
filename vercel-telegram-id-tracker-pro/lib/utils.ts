export function extractIds(text: string): { original: string; normalized: string }[] {
  const out: { original: string; normalized: string }[] = [];
  if (!text) return out;
  const re = /#[A-Za-z]\d{3}\b/g;
  const m = text.match(re) || [];
  for (const tok of m) {
    const normalized = tok.toUpperCase();
    out.push({ original: tok, normalized });
  }
  return out;
}

export type ActionLabel = "Instruction" | "Explanation" | "Connected eld" | "Response" | "";

export function classifyAction(text: string): ActionLabel {
  const t = String(text || "").toLowerCase();
  if (t.includes("called: instructions are provided")) return "Instruction";
  if (t.includes("explained")) return "Explanation";
  if (t.includes("connected")) return "Connected eld";
  if (t.includes("done / ready") || t.includes("done/ready") || t.includes("fixed")) return "Response";
  return "";
}