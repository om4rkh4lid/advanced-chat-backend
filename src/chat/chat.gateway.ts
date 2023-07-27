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

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) { }

  afterInit(server: Server) {
    server.use(sessionMiddleware);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('sessionCreated', client.session);
  }

  @SubscribeMessage('chatMessage')
  handleNewChatMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): boolean {
    this.server.emit('chatMessage', message);
    return true;
  }
}
