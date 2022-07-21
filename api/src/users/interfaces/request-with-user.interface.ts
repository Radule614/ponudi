import { User, UserDocument } from "../user.schema";

export interface ReqWithUser extends Request {
    user: UserDocument
}