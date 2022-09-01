import { ReqWithUser } from "src/users/interfaces/request-with-user.interface";
import { Product } from "../product.schema";

export interface ReqWithProduct extends ReqWithUser {
    product: Product
}