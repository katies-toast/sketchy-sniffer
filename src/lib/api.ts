import { AnalysisResponse } from "@/types/analysis";

const BASE_URL = "https://sketchysnifferapi-production.up.railway.app/api";

export async function analyzeUrl(url: string): Promise<AnalysisResponse> {
  const response = await fetch(`${BASE_URL}/analyses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Analysis failed (${response.status})`
    );
  }

  return response.json();
}
