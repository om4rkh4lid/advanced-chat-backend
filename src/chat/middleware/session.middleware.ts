import { randomUUID } from "crypto";
import { Socket } from "socket.io"
import { Session } from "src/types/custom/Session";

export const users = [1, 2, 3, 4, 5];
export const sessions = [] as Session[];

export const removeSession = (userId) => {
  const index = sessions.findIndex(session => session.userId === userId)
  sessions.splice(index, 1)
}

const findSession = (userId) => {
  return sessions.find(session => session.userId === userId);
}

const createSession = (userId) => {
  const newSession = {
    sessionId: randomUUID(),
    userId: userId
  };
  sessions.push(newSession);
  return newSession;
}

const sessionMiddleware = (socket: Socket, next: any) => {
  const session = socket.handshake.auth as Session;

  if (session?.userId) {
    const foundSession = findSession(session.userId);
    if (foundSession) {
      socket.session = foundSession;
      return next();
    } else {
      socket.session = createSession(session.userId);
      return next();
    }
  }
  next(new Error('Unauthenticated User'));
}

export default sessionMiddleware;