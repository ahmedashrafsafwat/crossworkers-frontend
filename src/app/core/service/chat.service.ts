import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Socket } from "ngx-socket-io";
import { ChatsApi } from "../data/chats";
import { Observable } from "rxjs/Observable";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class ChatService implements ChatsApi {
  /**
   * This service is responsible for all CRUD requests
   */

  // backend URI and endpoint API
  private backendUrl = "http://localhost:3000/";
  private endpoint = "chat";

  private url = "http://localhost:3000";
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url, {
      transports: ["websocket", "polling", "flashsocket"]
    });
  }

  //  Get all benefits
  getChats() {
    return Observable.create(observer => {
      this.socket.on("new-message", message => {
        console.log("from observable" + message);
        observer.next(message);
      });
    });
  }

  // get chats from API
  getChatsApi(fromId, toId) {
    return this.http.get(
      `${this.backendUrl + this.endpoint}/all/${fromId}/${toId}`
    );
  }

  // Get a certain log
  sendMessage(message: any) {
    console.log("sendMessage:", message);
    this.socket.emit("new-message", message);
    // return this.http.post(
    //   `${this.backendUrl + this.endpoint}/send/${message.fromId}/${
    //     message.toId
    //   }`,
    //   { message: message.message, senderName: message.senderName }
    // );
  }
}
