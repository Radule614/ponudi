import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { AdditionalField } from "src/app/model/article.model";
import { FieldType } from "src/app/model/article.model";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { take } from "rxjs";

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent implements OnInit {
  @Input() option: AdditionalField;
  @Input() editable: boolean;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  FieldType = FieldType;
  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(private modalService: MdbModalService){}
  ngOnInit(): void {}

  openDeleteModal() {
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.pipe(take(1)).subscribe(message => {
      if(message=='confirm'){
        this.deleteEvent.emit();
      }
    });
  }
}