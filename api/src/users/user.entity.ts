import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";


enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

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
        enum: UserRole,
        default: [UserRole.USER],
        nullable: false
    })
    role: Array<string> = [UserRole.USER]

}
