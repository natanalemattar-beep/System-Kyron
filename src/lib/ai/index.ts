export { ai, AiClient } from "./client";
export { getNextKey, getAiClient, getKeyCount } from "./key-manager";

export { customerServiceAgent, CustomerServiceAgent } from "./agents/customer-service";
export { dashboardAgent, DashboardAgent } from "./agents/dashboard";
export { documentGeneratorAgent, DocumentGeneratorAgent } from "./agents/document-generator";
export { documentAnalyzerAgent, DocumentAnalyzerAgent } from "./agents/document-analyzer";
export { marketingAgent, MarketingAgent } from "./agents/marketing";
export { analysisAgent, AnalysisAgent } from "./agents/analysis";

export type {
  CustomerServiceAction,
  DashboardInsight,
  DocumentGenerationResult,
  DocumentAnalysisResult,
  MarketingContent,
  AnalysisResult,
} from "./types";
