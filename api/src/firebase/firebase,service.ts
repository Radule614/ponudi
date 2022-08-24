import { Injectable } from "@nestjs/common";
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { join } from "path";



@Injectable()
export class FirebaseStorageService {

    async uploadFile(path: string, file: Buffer): Promise<string> {
        const app = getApp()
        const storage = getStorage(app, 'gs://ponudi-1f894.appspot.com/')
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        let url = await getDownloadURL(storageRef)
        return url
    }


}