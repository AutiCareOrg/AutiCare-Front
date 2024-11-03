import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';

interface MessageContent {
  text: {
    value: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private openai = new OpenAI({
    // apiKey não esta no enviroment por razões de segurança, caso for testar adicione a chave no campo apiKey
    apiKey: environment['apiKey'] || '',
    dangerouslyAllowBrowser: true
  });

  private assistantId = 'asst_x72FMQeaye8irRUn0ohzY8pn';

  sendMessage(message: string): Observable<MessageContent> {
    return from(this.getResponse(message));
  }

  private async getResponse(message: string): Promise<MessageContent> {
    const thread = await this.openai.beta.threads.create();
    await this.openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: this.assistantId
    });

    while (true) {
      const runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
      
      if (runStatus.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(thread.id);
        const content = messages.data[0].content[0];
        
        if (content.type === 'text') {
          return { text: { value: content.text.value } };
        }
        throw new Error('Received non-text response from OpenAI');
      }
      
      if (['failed', 'cancelled', 'expired'].includes(runStatus.status)) {
        throw new Error(`Chat failed: ${runStatus.status}`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}