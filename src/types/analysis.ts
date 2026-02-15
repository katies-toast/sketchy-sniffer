export interface AnalysisRequest {
  url: string;
  user_context?: string;
}

export interface AnalysisResponse {
  analysis_id: string;
  created_at: string;
  source: {
    platform: "kijiji" | "facebook_marketplace" | "unknown";
    url: string;
  };
  risk: {
    score: number;
    level: "low" | "medium" | "high";
    summary: string;
  };
  findings: Finding[];
  reflection_prompts: ReflectionPrompt[];
  quiz: {
    questions: QuizQuestion[];
  };
}

export interface Finding {
  id: string;
  type: "red_flag" | "cognitive_bias";
  header: string;
  summary: string;
  explanation: string;
  severity: "low" | "medium" | "high";
  evidence: string[];
}

export interface ReflectionPrompt {
  id: string;
  prompt: string;
}

export interface QuizQuestion {
  id: string;
  linked_finding_ids: string[];
  prompt: string;
  options: QuizOption[];
  correct_option_id: string;
  feedback: {
    correct_title: string;
    correct_body: string;
    incorrect_title: string;
    incorrect_body: string;
  };
}

export interface QuizOption {
  id: string;
  text: string;
}
