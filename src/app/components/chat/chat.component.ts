import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageModel} from "../../core/models/message.model";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {ChatService} from "../../core/services/chat.service";
import {ContactModel} from "../../core/models/contact.model";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageType} from "../../core/enum/message-type.enum";
import {generateRandomNumber} from "../../core/pure-functions/generate-random-number.function";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public currentMessageHistory = [{ }] as Array<MessageModel>;
  public currentContact = { } as ContactModel;
  public messageType = MessageType;

  public messagesHistory$ = new BehaviorSubject<Array<MessageModel>>([]);
  public contacts$ = new BehaviorSubject<Array<ContactModel>>([]);
  private destroy$ = new Subject();

  constructor(private activateRoute: ActivatedRoute, private chatService: ChatService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.contacts$ = this.chatService.contacts$;
    this.messagesHistory$ = this.chatService.messagesHistory$;

    this.activateRoute.params.pipe(
      tap((param: any) => {
        this.currentContact = this.contacts$.value.find(contact => contact.id === (+param.id)) as ContactModel;
        this.currentMessageHistory = this.messagesHistory$.value.filter(message => message.chatId === this.currentContact.chatId);
      }), takeUntil(this.destroy$)).subscribe()
  }

  public sendMessage(element:any): void {
    if(element.value.trim() === ''){
      return;
    }
    const newDate = new Date();
    const message = {
      chatId: this.currentContact.chatId,
      text: element.value,
      date: newDate,
      messageType: MessageType.Dispatched
    } as MessageModel;

    this.chatService.saveMessage(message, this.currentContact);
    this.currentMessageHistory.push(message);

    this.chatService.getRandomJoke().pipe(
      tap((joke) => {
        const contact = this.currentContact;
        setTimeout(() => {
          const date = new Date();
          const newMessage = {
            chatId: contact.chatId,
            text: joke.value,
            date: date,
            messageType: MessageType.Received
          } as MessageModel

          this.chatService.saveMessage(newMessage, contact);
          if(contact.chatId === this.currentContact.chatId){
            this.currentMessageHistory.push(newMessage);
          }
          this.snackbar.open('You have new message from: ' + contact.username, 'Ok');
        },generateRandomNumber() * 1000)
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    element.value = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
