import { User } from "../user.entity";

export interface ReqWithUser extends Request {
    user: User
}