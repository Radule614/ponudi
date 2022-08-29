import { ReqWithUser } from "src/users/interfaces/request-with-user.interface";
import { Shop } from "../shop.schema";

export interface ReqWithShop extends ReqWithUser {
    shop: Shop
}