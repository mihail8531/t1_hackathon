import AuthService from './authService/authService';
import RAGServiceClass from './RAGService/RAGService';

export const RAGService = new RAGServiceClass('http://127.0.0.1:8888', '/v1');
export const authService = new AuthService('http://127.0.0.1:9101', '/api/v1/auth');
