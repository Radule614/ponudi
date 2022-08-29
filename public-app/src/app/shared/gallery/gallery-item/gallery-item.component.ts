import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { Image } from "src/app/model/image.model";
import { ConfirmModalComponent } from "../../confirm-modal/confirm-modal.component";
import { take } from "rxjs";

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit {
  @Input() image: Image;
  @Input() editable: boolean;
  @Output() deleteEvent: EventEmitter<Image> = new EventEmitter();

  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;
  
  constructor(private modalService: MdbModalService) {}
  ngOnInit(): void {}

  openDeleteModal() {
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.pipe(take(1)).subscribe(message => {
      if(message=='confirm'){
        this.deleteEvent.emit(this.image);
      }
    });
  }

  get imagePath(){
    return `url("${this.image.url}")`;
  }
}