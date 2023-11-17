 export type SocketUser = {
    username: string,
    id: number,
    createdAt: Date
  }
  
 export type SocketDataType = {
    message: string,
    author: string,
    date: Date,
    roomId : string
  }
  
 export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void
  }
 export interface ClientToServerEvents {
    send_message: (data: SocketDataType) => void
  }
 export interface InternalServerEvents {
    ping: () => void
  }
 export interface SocketData {
    name: string
    age: number
  }