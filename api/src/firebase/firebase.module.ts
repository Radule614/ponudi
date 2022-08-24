import { Module } from "@nestjs/common";
import { FirebaseStorageService } from "./firebase,service";



@Module({
    providers: [FirebaseStorageService],
    imports: [],
    exports: [FirebaseStorageService]
})
export class FirebaseStorageModule { }