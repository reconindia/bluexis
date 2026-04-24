
export function calculateRisk(data: { setup?: string; situation?: string }) {
  let score = 50;

  // Normalizing situational inputs for scoring logic
  const isNoPMC = data.setup?.includes('without PMC') || data.setup === 'no_pmc';
  const isStuck = data.situation?.includes('stuck') || data.situation === 'stuck';
  const isEvaluating = data.situation?.includes('Evaluating') || data.situation === 'evaluating';
  const isPMCStructured = data.setup?.includes('Structured') || data.setup === 'pmc_structured';

  if (isNoPMC) score += 20;
  if (isStuck) score += 25;
  if (isEvaluating) score += 15;
  if (isPMCStructured) score -= 15;

  score = Math.max(0, Math.min(100, score));

  let confidence: 'Low' | 'Medium' | 'High' = "Medium";
  if (score > 70) confidence = "Low";
  if (score < 40) confidence = "High";

  let diagnosis = '';
  if (score > 80) {
    diagnosis = "Critical structural vulnerability. Immediate protocol intervention required to prevent irreversible deadlock.";
  } else if (score > 50) {
    diagnosis = "Elevated decision risk. Asymmetric information or lack of oversight layers may compromise outcome.";
  } else {
    diagnosis = "Stabilized environment. Focus on compliance audit and alignment maintenance.";
  }

  return { score, confidence, diagnosis };
}
