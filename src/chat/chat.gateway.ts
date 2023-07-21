import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chatMessage')
  handleNewChatMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): boolean {
    console.log(client);
    this.server.emit('chatMessage', message);
    return true;
  }
}
