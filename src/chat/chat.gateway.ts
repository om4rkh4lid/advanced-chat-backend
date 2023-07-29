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
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) { }
  
  afterInit(server: Server) {
    server.use(sessionMiddleware);
  }
  
  async handleConnection(client: Socket, ...args: any[]) {
    client.emit('sessionCreated', client.session);
    client.join(`user#${client.session.userId}`);
    const socketsInTheRoom = (await this.server.in(`user#${client.session.userId}`).fetchSockets()).length;
    console.log(`Sockets in room #${client.session.userId}:`, socketsInTheRoom);
    this.server.emit('activeUsers', sessions.map(session => session.userId));
  }
  
  @SubscribeMessage('chatMessage')
  handleNewChatMessage(@MessageBody() message: ChatMessage, @ConnectedSocket() client: Socket): boolean {
    this.server.to(`user#${message.from}`).to(`user#${message.to}`).emit('chatMessage', message);
    return true;
  }

  async handleDisconnect(client: Socket) {
    const socketsInTheRoom = (await this.server.in(`user#${client.session.userId}`).fetchSockets()).length;
    if (socketsInTheRoom === 0) {
      removeSession(client.session.userId);
      this.server.emit('activeUsers', sessions.map(session => session.userId));
    }
  }

}
