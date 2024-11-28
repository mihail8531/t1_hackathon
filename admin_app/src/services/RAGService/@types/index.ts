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
  tenant_id: string;
  name: string;
  llm_id: string;
  embd_id: string;
  img2txt_id: '';
  asr_id: '';
  rerank_id: '';
  tts_id: null;
}

export interface SetUserModelsResponse {
  code: number;
  data: boolean;
  message: string;
}

export interface SetDatasetResponse {
  code: number;
  data: SetDatasetResponseData;
}

export interface SetDatasetResponseData {
  avatar: any;
  chunk_count: number;
  chunk_method: string;
  create_date: string;
  create_time: number;
  created_by: string;
  description: any;
  document_count: number;
  embedding_model: string;
  id: string;
  language: string;
  name: string;
  parser_config: ParserConfig;
  permission: string;
  similarity_threshold: number;
  status: string;
  tenant_id: string;
  token_num: number;
  update_date: string;
  update_time: number;
  vector_similarity_weight: number;
}

export interface ParserConfig {
  chunk_token_num: number;
  delimiter: string;
  html4excel: boolean;
  layout_recognize: boolean;
  raptor: Raptor;
}

export interface Raptor {
  use_raptor: boolean;
}

export interface UploadFileResponse {
  dataset_id: string;
  docs: string[];
}

/*  */
export interface GetDatasetsResponse {
  code: number;
  data: Daum[];
}

export interface Daum {
  avatar: any;
  chunk_count: number;
  chunk_method: string;
  create_date: string;
  create_time: number;
  created_by: string;
  description: any;
  document_count: number;
  embedding_model: string;
  id: string;
  language: string;
  name: string;
  parser_config: ParserConfig;
  permission: string;
  similarity_threshold: number;
  status: string;
  tenant_id: string;
  token_num: number;
  update_date: string;
  update_time: number;
  vector_similarity_weight: number;
}

export interface ParserConfig {
  chunk_token_num: number;
  delimiter: string;
  html4excel: boolean;
  layout_recognize: boolean;
  raptor: Raptor;
}

export interface Raptor {
  use_raptor: boolean;
}

/*  */
export interface CreateWindowPayload {
  style: string;
  assistant_id: string;
}

export interface CreateWindowResponse {
  id: number;
  style: string;
  assistant_id: string;
}
