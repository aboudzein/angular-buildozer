import { Component, OnInit } from '@angular/core';
import { ChatCardManager, IChatCard } from '../chat-card.manager';
import { UsersService } from '@shared/services/users';
import { UsersModel, ChatModel } from '@shared/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, filter, share, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';
import { ChatService } from '@shared/services/chat';
import { ChatConversationCardComponent } from '../chat-conversation-card/chat-conversation-card.component';
import { PopupManager } from '@widget/popup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatGroupCardComponent } from '../chat-group-card/chat-group-card.component';

@Component({
  selector: 'app-chat-create-card',
  templateUrl: './chat-create-card.component.html',
  styleUrls: ['./chat-create-card.component.scss']
})
export class ChatCreateCardComponent implements OnInit, IChatCard<any> {
  data: any;
  id: string;
  $users: Observable<UsersModel.IUser[]> = null;
  selectedUsers: UsersModel.IUser[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  autocompleteControl = new FormControl();

  $room: Observable<ChatModel.IRoom> = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private usersService: UsersService,
    private chatService: ChatService,
    private popupManager: PopupManager,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.$users = (this.autocompleteControl.valueChanges as Observable<string>).pipe(
      filter(AppUtils.hasItemWithin),
      typeaheadOperator(),
      switchMap((value) => this.usersService.searchForUsers(value)),
      map(users => users.filter(user => {
        return this.selectedUsers.findIndex(selectedUser => selectedUser._id === user._id) === -1
      }))
    );
  }

  closeCard() {
    this.chatCardManager.removeCard();
  }

  selectUser(event: MatAutocompleteSelectedEvent, autoCompleteInput: HTMLInputElement) {
    const user = event.option.value as UsersModel.IUser;
    this.selectedUsers.push(user);
    this.autocompleteControl.setValue(null);
    autoCompleteInput.value = '';
    this.checkForRoom();
  }

  removeUser(index: number) {
    this.selectedUsers.splice(index, 1);
    this.selectedUsers.length && this.checkForRoom();
  }

  checkForRoom() {
    const users = this.selectedUsers.map(({ _id }) => _id);
    this.$room = this.chatService.getGroup(users).pipe(share());
  }

  createRoom(message: string) {
    const component = this.isSingleUser ? ChatConversationCardComponent : ChatGroupCardComponent;
    this.popupManager.prompt({
      data: { title: 'Conversation name' }
    })
      .afterClosed()
      .pipe(
        switchMap((name) => {
          if (AppUtils.isEmptyString(name)) {
            this.snackbar.open('Please enter name');
            return of(null);
          }
          return this.chatService.createRoom(message, name, this.selectedUsers.map(user => user._id))
        }),
        filter(AppUtils.notNullOrUndefined)
      )
      .subscribe((room) => {
        this.chatCardManager.open(component, {
          id: room._id,
          data: room
        });
      });
  }

  jumpToRroom(room: ChatModel.IRoom, message: string) {
    const component = room.single ? ChatConversationCardComponent : ChatGroupCardComponent;
    this.chatCardManager.open(component, {
      id: room._id,
      data: room
    });
  }

  get isSingleUser() {
    return this.selectedUsers.length === 1;
  }

  get isGroup() {
    return this.selectedUsers.length > 1;
  }

}
