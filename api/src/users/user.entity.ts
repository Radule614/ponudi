import { Column, Entity, PrimaryColumn, ObjectIdColumn, ObjectID, Unique } from "typeorm";


@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID
    @Column()
    name: string
    @Column()
    surname: string
    @Column({
        unique: true
    })
    username: string
    @Column()
    password: string
    @Column({
        unique: true
    })
    email: string
    @Column()
    description: string
    @Column()
    profileUrl: string
    @Column()
    role: string[]

}
