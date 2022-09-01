import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactModel} from "../../core/models/contact.model";
import {ChatService} from "../../core/services/chat.service";
import {BehaviorSubject, Subject, switchMap, takeUntil, tap} from "rxjs";
import {MessageModel} from "../../core/models/message.model";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  public contacts$ = new BehaviorSubject<Array<ContactModel>>([]);
  private destroy$ = new Subject();

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.contacts$ = this.chatService.contacts$;
    this.contacts$.pipe(
      switchMap((array) => array.sort((a, b) => {
        return <any>new Date(b.lastMessageDate) - <any>new Date(a.lastMessageDate);
      }))
    ).subscribe()
  }

  public search(inputValue: string): void {
    const allContacts = JSON.parse(localStorage.getItem('contacts') as string) as Array<ContactModel>;
    this.contacts$.next(allContacts.filter(contact => contact.username.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
