import AuthService from './authService/authService';
import RAGServiceOriginClass from './RAGService/RAGServiceOrigin';
import RAGServiceForkClass from './RAGService/RAGServiceFork';
import APIServiceClass from './APIService/APIService';
export const RAGServiceOrigin = new RAGServiceOriginClass('http://127.0.0.1:8888', '/api/v1');
export const RAGServiceFork = new RAGServiceForkClass('http://127.0.0.1:8888', '/v1');
export const authService = new AuthService('http://127.0.0.1:9101', '/api/v1/auth');
export const APIService = new APIServiceClass('http://127.0.0.1:9101', '/api/v1');
