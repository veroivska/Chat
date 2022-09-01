import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {JokeModel} from "../models/joke.model";
import {ContactModel} from "../models/contact.model";
import {MessageModel} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public contacts$ = new BehaviorSubject<Array<ContactModel>>([]);
  public messagesHistory$ = new BehaviorSubject<Array<MessageModel>>([]);

  constructor(private http: HttpClient) {
    this.contacts$.next(JSON.parse(localStorage.getItem('contacts') as string) as Array<ContactModel>);
    this.messagesHistory$.next(JSON.parse(localStorage.getItem('messages') as string) as Array<MessageModel>);
  }

  public getRandomJoke(): Observable<JokeModel> {
    return this.http.get<JokeModel>('https://api.chucknorris.io/jokes/random')
  }

  public saveMessage(message: MessageModel, currentContact: ContactModel): void {
    this.messagesHistory$.value.push(message);
    currentContact.lastMessage = message.text;
    currentContact.lastMessageDate = message.date;
    this.contacts$.value.map(contact => contact.id === currentContact.id ? currentContact : contact);
    this.contacts$.next(this.contacts$.value);
    localStorage.setItem('messages', JSON.stringify(this.messagesHistory$.value));
    localStorage.setItem('contacts', JSON.stringify(this.contacts$.value));
  }

}
