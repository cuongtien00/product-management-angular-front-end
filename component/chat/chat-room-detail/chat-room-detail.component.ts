import { Component, OnInit } from '@angular/core';
import {Message} from "../../../model/Message";
import {SocketService} from "../../../service/socket/socket.service";
import {TokenService} from "../../../service/token.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'app-chat-room-detail',
  templateUrl: './chat-room-detail.component.html',
  styleUrls: ['./chat-room-detail.component.css']
})
export class ChatRoomDetailComponent implements OnInit {

  messages: Message[] = [];
  form: any = {}
// @ts-ignore
  message: Message = {}
  constructor(
    public socketService: SocketService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log("vao phong")
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      console.log('param ->' + id);
      this.tokenService.setRoomId(id);
    });
    this.socketService.connect();
  }


  createMessage() {
// @ts-ignore
    this.message = {
      content: this.form.content,
      status: 0,
      sender: {
        id: this.tokenService.getUserId(),
        name:this.tokenService.getName(),
      },
      roomId: this.tokenService.getRoomId(),
      time: new Date(),
    }
    console.log('message: ' + JSON.stringify(this.message));
    this.socketService.createMessageUsingSocket(this.message);
    this.form = {};
  }

  outRoom() {
    window.sessionStorage.removeItem('RoomId_Key');
    this.router.navigate(['/chat-room']);

  }
}
