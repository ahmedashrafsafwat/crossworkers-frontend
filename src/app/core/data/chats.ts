export abstract class ChatsApi {
  abstract getChats(fromId: string, toId: string);

  abstract sendMessage(Object);
}
