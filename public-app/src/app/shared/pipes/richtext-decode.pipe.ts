import { Pipe } from "@angular/core";

import { richtextDecoder } from "src/app/richtext/encoder.js"; 

@Pipe({name: 'richtextDecoder'})
export class RichtextDecoderPipe {
  constructor(){}

  transform(text: string | null | undefined) {
    if(text){
      return richtextDecoder(text);
    }
    return "";
  }
}