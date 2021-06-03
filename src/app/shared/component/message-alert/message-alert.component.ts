import {Component, Input, OnInit} from '@angular/core';
import {MessageAlertType} from "../../enum/message-alert-type";

@Component({
  selector: 'app-shared-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class SharedMessageAlertComponent implements OnInit {

  @Input() message: string = '';
  @Input() type: MessageAlertType = MessageAlertType.Success;

  messageAlertType = MessageAlertType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
