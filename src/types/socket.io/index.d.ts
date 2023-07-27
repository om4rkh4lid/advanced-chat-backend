import { Session } from "../custom/Session";

export {};

declare module 'socket.io' {
    export interface Socket {
      session: Session;
    }
}
