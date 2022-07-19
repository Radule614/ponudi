import { ObjectID } from "typeorm"


export class UserDTO {
    id?: ObjectID
    name?: string
    surname?: string
    username?: string
    email?: string
    profileUrl?: string
}