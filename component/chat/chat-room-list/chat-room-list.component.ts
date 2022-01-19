import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  comeIn(event) {
    this.router.navigate(['/chat-room-detail/'+event.target.id]);
  }
}
