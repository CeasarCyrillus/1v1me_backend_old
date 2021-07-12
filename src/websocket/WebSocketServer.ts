import { Server } from "http";
import {
  connection as Connection,
  IMessage,
  request as WsRequest,
  server as WS,
} from "websocket";
import { generateRandomString } from "../utils";

const Events = <const>{
  REQUEST: "request",
  MESSAGE: "message",
};

export class WebSocketServer {
  private ws: WS;
  private connections: { [connectionId: string]: Connection } = {};
  constructor(server: Server) {
    this.ws = new WS({ httpServer: server });
    this.ws.on(Events.REQUEST, this.onRequest);
  }

  onRequest = (request: WsRequest) => {
    const connection = request.accept();
    connection.on(Events.MESSAGE, this.onMessage);

    const connectionId = generateRandomString();
    connection.sendUTF(
      JSON.stringify({
        type: "ping",
        id: connectionId,
      }),
    );

    this.addConnection(connection, connectionId);
    this.initialisePingPong(connection, connectionId);
  };

  onMessage = (message: IMessage) => {
    const msg = JSON.parse(message.utf8Data) as WsMessage;
    if (msg.type === "ping") {
      this.connections[msg.id].sendUTF(
        JSON.stringify({
          type: "pong",
          id: msg.id,
        }),
      );
    }
  };

  addConnection = (connection: Connection, connectionId: string) => {
    if (this.connections[connectionId] !== undefined) {
      this.connections[connectionId].drop(
        1001,
        "new connection created with same id",
      );
    }
    this.connections[connectionId] = connection;
  };

  private initialisePingPong(connection: Connection, connectionId: string) {
    const pingInterval = setInterval(() => {
      connection.sendUTF(JSON.stringify({
        type: "ping",
        id: connectionId
      }))
    }, 5000)

    // TODO: no need for interval, can check new Date() for removal     +
    setTimeout(() => {
      connection.drop(1001, "no pong message received");
      delete this.connections[connectionId];
    }, 5000);


  }
}

interface WsMessage {
  type: string;
  id: string;
}