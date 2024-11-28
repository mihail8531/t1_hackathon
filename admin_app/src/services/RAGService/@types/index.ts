export interface GetAllModelsResponse {
  code: number;
  data: GetAllModelsResponseData;
  message: string;
}

export type GetAllModelsResponseData = Record<string, LLMModel[]>;

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

export type SetAPIKeyPayload = { llm_factory: string; api_key: string; base_url?: string };

export interface GetUserModelsResponse {
  code: number;
  data: GetUserModelsResponseData;
  message: string;
}

export interface GetUserModelsResponseData {
  asr_id: string;
  embd_id: string;
  img2txt_id: string;
  llm_id: string;
  name: string;
  parser_ids: string;
  rerank_id: string;
  role: string;
  tenant_id: string;
  tts_id: any;
}

export interface SetUserModelsPayload {
  tenant_id: string
  name: string
  llm_id: string
  embd_id: string
  img2txt_id: '';
  asr_id: '';
  rerank_id: '';
  tts_id: null;
}
