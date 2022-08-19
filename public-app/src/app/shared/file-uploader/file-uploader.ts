import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'file-uploader',
  templateUrl: 'file-uploader.html',
  styleUrls: ['file-uploader.scss']
})
export class FileUploaderComponent implements OnInit {
  selectedFile: File | null = null;
  @Output() fileSelectedEvent: EventEmitter<File> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  imageInputChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != null){
      this.fileSelectedEvent.emit(this.selectedFile);
    }
  }

  resetInput(input: any): void{
    input.value = null;
    this.selectedFile = null;
  }
}