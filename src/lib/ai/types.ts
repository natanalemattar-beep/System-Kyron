export interface CustomerServiceAction {
  type: "email" | "internal_note" | "advisor_alert" | "draft_response";
  priority: "low" | "medium" | "high" | "critical";
  content: string;
  recipient?: string;
  reason: string;
}

export interface DashboardInsight {
  metric: string;
  currentValue: number;
  trend: "up" | "down" | "stable";
  changePercent: number;
  insight: string;
  recommendation: string;
  priority: "low" | "medium" | "high";
}

export interface DocumentGenerationResult {
  documentType: string;
  content: string;
  metadata: Record<string, string>;
  warnings: string[];
}

export interface DocumentAnalysisResult {
  documentType: string;
  extractedData: Record<string, unknown>;
  anomalies: string[];
  compliance: "compliant" | "warning" | "non_compliant";
  summary: string;
  confidence: number;
}

export interface MarketingContent {
  type: "social_post" | "email_campaign" | "seo_article" | "ad_copy";
  content: string;
  variants: string[];
  targetAudience: string;
  keywords: string[];
  cta: string;
}

export interface AnalysisResult {
  category: string;
  findings: string[];
  risks: string[];
  opportunities: string[];
  score: number;
  summary: string;
  nextSteps: string[];
}
