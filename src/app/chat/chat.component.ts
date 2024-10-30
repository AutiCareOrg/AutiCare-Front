import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { firstValueFrom } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerMessage } from '@ng-icons/tabler-icons';

interface ChatMessage {
  sender: 'User' | 'Assistant';
  content: string;
  timestamp?: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIconComponent
  ],
  providers: [provideIcons({ tablerMessage })],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  userMessage = '';
  isLoading = false;
  error: string | null = null;

  constructor(private chatService: ChatService) { }

  async sendMessage(): Promise<void> {
    const trimmedMessage = this.userMessage.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      this.isLoading = true;
      this.error = null;

      this.addMessage('User', trimmedMessage);
      this.userMessage = '';

      const response = await firstValueFrom(
        this.chatService.sendMessage(trimmedMessage)
      );

      if (response) {
        this.addMessage('Assistant', response.response);
        console.log(this.messages)
      }

    } catch (error) {
      this.error = 'Failed to send message. Please try again.';
      console.error('Error sending message:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private addMessage(sender: ChatMessage['sender'], content: string): void {
    content = this.formatMessage(content)
    this.messages.push({
      sender,
      content,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messagesArea = document.querySelector('.messages-area');
      if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }, 100);
  }

  private formatMessage(response: string): string {
    let formattedResponse = response
      .replace(/(\*\*([^*]+)\*\*)/g, '<strong>$2</strong>')
      .replace(/\n\n(\d+\.)/g, '<br><br><strong>$1</strong>')
      .replace(/\n/g, '<br>');

    return formattedResponse;
  }
}
