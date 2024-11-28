export interface GetAssistansResponse {
  code: number;
  data: Daum[];
}

export interface Daum {
  avatar: string;
  create_date: string;
  create_time: number;
  datasets: Dataset[];
  description: string;
  do_refer: string;
  id: string;
  language: string;
  llm: Llm;
  name: string;
  prompt: Prompt;
  prompt_type: string;
  status: string;
  tenant_id: string;
  top_k: number;
  update_date: string;
  update_time: number;
}

export interface Dataset {
  avatar: any;
  chunk_num: number;
  create_date: string;
  create_time: number;
  created_by: string;
  description: any;
  doc_num: number;
  embd_id: string;
  id: string;
  language: string;
  name: string;
  parser_config: ParserConfig;
  parser_id: string;
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
  pages: number[][];
}

export interface Llm {
  frequency_penalty: number;
  max_tokens: number;
  model_name: string;
  presence_penalty: number;
  temperature: number;
  top_p: number;
}

export interface Prompt {
  empty_response: string;
  keywords_similarity_weight: number;
  opener: string;
  prompt: string;
  refine_multiturn: boolean;
  rerank_model: string;
  show_quote: boolean;
  similarity_threshold: number;
  top_n: number;
  tts: boolean;
  variables: Variable[];
}

export interface Variable {
  key: string;
  optional: boolean;
}

export interface SendMessagePayload {
  question: string;
  stream: boolean;
  session_id?: string;
}

export interface SendMessageResponse {
  code: number;
  data: Data;
}

export interface Data {
  answer: string;
  audio_binary: any;
  id: string;
  prompt: string;
  reference: Reference;
  session_id: string;
}

export interface Reference {
  chunks: Chunk[];
  doc_aggs: DocAgg[];
  total: number;
}

export interface Chunk {
  content: string;
  dataset_id: string;
  document_id: string;
  document_name: string;
  id: string;
  image_id: string;
  positions: any[];
  similarity: number;
  term_similarity: number;
  vector_similarity: number;
}

export interface DocAgg {
  count: number;
  doc_id: string;
  doc_name: string;
}
