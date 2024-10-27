import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatRequest {
  userMessage: string;
}

interface ChatResponse {
  response: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<ChatResponse> {
    const request: ChatRequest = { userMessage };
    return this.http.post<ChatResponse>(this.apiUrl, request);
  }
}