import { Module } from "@nestjs/common";
import { FirebaseStorageService } from "./firebase.service";



@Module({
    providers: [{
        provide: 'IStorageService',
        useClass: FirebaseStorageService
    }],
    imports: [],
    exports: [{
        provide: 'IStorageService',
        useClass: FirebaseStorageService
    }]
})
export class StorageModule { }