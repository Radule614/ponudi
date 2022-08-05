import { Component, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<ConfirmModalComponent>) { }
  ngOnInit(): void { }

  cancel(): void {
    this.modalRef?.close('cancel');
  }

  confirm(): void {
    this.modalRef?.close('confirm');
  }
}