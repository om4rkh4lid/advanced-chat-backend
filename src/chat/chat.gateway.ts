import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import sessionMiddleware, { removeSession, sessions } from './middleware/session.middleware';
import { ChatMessage } from './entities/ChatMessage';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) { }

  afterInit(server: Server) {
    server.use(sessionMiddleware);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('sessionCreated', client.session);
    client.join(`user#${client.session.userId}`);
    client.emit('activeUsers', sessions.map(session => session.userId));
  }

  @SubscribeMessage('chatMessage')
  handleNewChatMessage(@MessageBody() message: ChatMessage, @ConnectedSocket() client: Socket): boolean {
    this.server.to(`user#${message.from}`).to(`user#${message.to}`).emit('chatMessage', message);
    return true;
  }
}
