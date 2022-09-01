import {MessageType} from "../enum/message-type.enum";

export interface MessageModel {
  chatId: number;
  text: string;
  date: Date;
  messageType: MessageType;
}
