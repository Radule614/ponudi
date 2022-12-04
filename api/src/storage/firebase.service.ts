import { Injectable } from "@nestjs/common";
import { getApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";
import { IStorageService } from "./interfaces/storage-service.interface";
import * as uuid from "uuid"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FirebaseStorageService implements IStorageService {

    constructor(
        private readonly configService: ConfigService
    ) { }

    async deleteFile(url: any): Promise<void> { }

    async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
        const app = getApp()
        const bucketUrl = this.configService.get('FIREBASE_STORAGE_BUCKET')
        const storage = getStorage(app, `gs://${bucketUrl}/`)
        const name = uuid.v4()
        const chunks = file.originalname.split('.');
        const extension: string = "." + chunks[chunks.length - 1]

        console.log("EXTENSION: " + extension);

        const storageRef = ref(storage, path + name + extension)
        await uploadBytes(storageRef, file.buffer)
        let url = await getDownloadURL(storageRef)
        return url
    }

    async uploadFiles(path: string, files: Array<Express.Multer.File>): Promise<Array<string>> {
        let urls: string[] = []
        for (let file of files) {
            let url = await this.uploadFile(path, file)
            urls.push(url)
        }
        return urls
    }


}