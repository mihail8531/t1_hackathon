export interface GetAllModelsResponse {
  code: number;
  data: Data;
  message: string;
}

export type Data = Record<string, LLMModel>;

export interface LLMModel {
  available: boolean;
  create_date: string;
  create_time: number;
  fid: string;
  llm_name: string;
  max_tokens: number;
  model_type: string;
  status: string;
  tags: string;
  update_date: string;
  update_time: number;
}
