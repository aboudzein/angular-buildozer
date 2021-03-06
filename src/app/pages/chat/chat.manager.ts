import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { fromEvent } from 'rxjs';
import { TokenHelper } from '@core/helpers/token';
import { ChatModel } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class ChatManager {
    public socket = io(environment.serverOrigin, {
        query: { token: this.tokenService.token }
    });
    public onConnect = fromEvent(this.socket, 'connect');
    public messageListener = new SubjectFactory<ChatModel.Message>();

    constructor(
        private tokenService: TokenHelper
    ) {
    }

    sendMessage(message: ChatModel.Message) {
        this.socket.emit('SendMessage', new ChatModel.ChatOutgoingMessage(
            message.room,
            message.text,
            message.order,
            message.timestamp
        ));
    }

    streamVideo(videoStream: ChatModel.VideoStream) {
        this.socket.emit('StreamOffer', videoStream);
    }

    sendLocalMessage(message: ChatModel.Message) {
        this.messageListener.notify(message);
    }

    join(id: string) {
        this.socket.emit('Join', { id });
    }

    leave(id: string) {
        this.socket.emit('Leave', { id });
    }
}