import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ChatService } from "src/app/core/service/chat.service";
import { stringify } from "@angular/compiler/src/util";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.sass"]
})
export class ChatBoxComponent implements OnInit {
  @Input() to: string;
  @Input() toId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  messages: [];
  currentUserName = localStorage.getItem("username");

  constructor(private service: ChatService) {}

  closeChatBox() {
    console.log("PRESSED");
    this.close.emit("close chat box with: " + this.to + this.toId);
  }

  sendMessage(message, toId) {
    this.service.sendMessage({
      message,
      fromId: localStorage.getItem("id"),
      toId: toId,
      senderName: localStorage.getItem("username")
    });
  }

  ngOnInit() {
    this.service.getChatsApi(localStorage.getItem("id"), this.toId).subscribe(
      (response: any) => {
        console.log(response);
        this.messages = response.data.messages;
      },
      err => {}
    );

    this.service.getChats().subscribe(
      (response: any) => {
        console.log(response);
        this.messages = response.messages;
      },
      err => {}
    );
  }

  ngOnDestroy() {
    console.log("component destroyed", this.to + this.toId);
  }
}
