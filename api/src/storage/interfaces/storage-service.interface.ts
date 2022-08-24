export interface IStorageService {
    uploadFile(path: string, file: Express.Multer.File): Promise<string>
    uploadFiles(path: string, files: Array<Express.Multer.File>): Promise<Array<string>>
    deleteFile(url): Promise<void>
}