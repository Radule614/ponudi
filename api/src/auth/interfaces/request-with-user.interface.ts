import { User } from "src/users/user.entity";

export interface IReqWithIUser extends Request {
    user: User
}