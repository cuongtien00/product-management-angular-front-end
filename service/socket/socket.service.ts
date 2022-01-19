import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Product} from "../../model/product";
import {ProductService} from "../product-service.service";
import {Category} from "../../model/category";
import {Message} from "../../model/Message";
import {MessageService} from "../message/message.service";
import {TokenService} from "../token.service";
const API_URL = `${environment.API_LOCAL}`
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  messages: Message[] = [];
  stompClient: any;
  constructor(
    private messageService: MessageService,
    private tokenService: TokenService
  ) {
  }
   getAllMessage() {
    this.messageService.getAllMessage().subscribe(data =>{
      console.log('socketService data: ' + JSON.stringify(data));
      this.messages = data;
    });
  }


  //goi den api cua websocket
  connect() {
      this.getAllMessage();
    const ws = new SockJS(`${API_URL}ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({},() =>{
let roomId = this.tokenService.getRoomId();
      // @ts-ignore
      //hung du lieu ve tu phong /topic/product cua websocket ben BE
      this.stompClient.subscribe('/topic/message/'+roomId, data => {
        console.log('data connect: ' +data.body);
        const  message: Message = JSON.parse(data.body)
        this.messages.push(message);
        // this.messages = ;
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
    this.stompClient.disconnect();
    }
  }
  // moi api phai them phan /app o trong websocket- config
  createMessageUsingSocket(message: Message) {
    let roomId:number = this.tokenService.getRoomId();
    this.stompClient.send('/app/messages/create/'+roomId,{},JSON.stringify(message));
  }
  // moi api phai them phan /app o trong websocket- config
  // createMessageUsingSocket(message: Message) {
  //   let roomId:number = this.tokenService.getRoomId();
  //   this.stompClient.send('/app/messages/create/'+roomId,{},JSON.stringify(message));
  // }
  // moi api phai them phan /app o trong websocket- config
  getAll() {
    let roomId:number = this.tokenService.getRoomId();
    this.stompClient.send('/app/messages/'+roomId,{},"list");
  }
}
