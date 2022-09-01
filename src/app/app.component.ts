import {Component, OnInit} from '@angular/core';
import {MessageModel} from "./core/models/message.model";
import {ContactModel} from "./core/models/contact.model";
import {MessageType} from "./core/enum/message-type.enum";
import {ChatService} from "./core/services/chat.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public contacts = [
    {
      id: 0,
      img: 'http://surl.li/ctvpc',
      username: 'Alice Freeman',
      lastMessage: 'You are the worst!',
      lastMessageDate: new Date(),
      chatId: 0
    },
    {
      id: 1,
      img: 'http://surl.li/ctvny',
      username: 'Josefina',
      lastMessage: 'We are losing money! Quick!',
      lastMessageDate: new Date(),
      chatId: 1
    },
    {
      id: 2,
      img: 'http://surl.li/ctvnv',
      username: 'Velazquez',
      lastMessage: 'Quickly come to the meeting room 1B,we have a big server issue',
      lastMessageDate: new Date(),
      chatId: 2
    },
    {
      id: 3,
      img: 'http://surl.li/ctvpi',
      username: 'Barrera',
      lastMessage: 'You are the worst!',
      lastMessageDate: new Date(),
      chatId: 3
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/236x/f8/f4/05/f8f405ef7d1266be34744bb981965f0d.jpg',
      username: 'Lana',
      lastMessage: 'You are the worst!',
      lastMessageDate: new Date(),
      chatId: 4
    },
    {
      id: 5,
      img: 'https://i.pinimg.com/236x/1f/a6/bb/1fa6bb53e5be82606325a96ba1ed2cb6.jpg',
      username: 'Pedro',
      lastMessage: 'You are the worst!',
      lastMessageDate: new Date(),
      chatId: 5
    },
    {
      id: 6,
      img: 'https://i.pinimg.com/564x/6d/46/ef/6d46efdf3cfb84e4937c5f58b8d6a680.jpg',
      username: 'Salad',
      lastMessage: 'You are the worst!',
      lastMessageDate: new Date(),
      chatId: 6
    }
  ] as Array<ContactModel>;
  public messages = [
    {
      chatId: 0,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 0,
      messageType: MessageType.Dispatched,
      text: 'I\'m having breakfast right now, can\'t you wait for 10 minutes?',
      date: new Date()
    },
    {
      chatId: 0,
      messageType: MessageType.Received,
      text: 'We are loosing money! Quick!',
      date: new Date()
    },
    {
      chatId: 1,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 2,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 3,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 4,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 5,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },
    {
      chatId: 6,
      messageType: MessageType.Received,
      text: 'Quickly come to the meeting room B1, we have a big server issue',
      date: new Date()
    },

  ] as Array<MessageModel>;

  constructor(private chatService: ChatService) {
  }
  ngOnInit(): void {
    if(localStorage.getItem('contacts') === null) {
      localStorage.setItem('contacts', JSON.stringify(this.contacts))
      this.chatService.contacts$.next(JSON.parse(localStorage.getItem('contacts') as string))
    }
    if(localStorage.getItem('messages') === null){
      localStorage.setItem('messages', JSON.stringify(this.messages))
      this.chatService.messagesHistory$.next(JSON.parse(localStorage.getItem('messages') as string))
    }
  }

}
