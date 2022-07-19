import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";
import { UserRole } from "./enums/user-role.enum";



@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID
    @Column({
        default: ""
    })
    name: string
    @Column({
        default: ""
    })
    surname: string
    @Column({
        unique: true
    })
    username: string
    @Column({
        default: ""
    })
    password: string
    @Column({
        unique: true
    })
    email: string
    @Column({
        default: ""
    })
    description: string
    @Column({
        default: ""
    })
    profileUrl: string
    @Column({
        default: [UserRole.USER],
        nullable: false
    })
    role: Array<UserRole> = [UserRole.USER]

}
