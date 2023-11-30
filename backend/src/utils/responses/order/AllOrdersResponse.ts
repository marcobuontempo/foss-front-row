import { IOrder } from "@models/Order.model";
import SuccessReponse from "../SuccessResponse";

class AllOrdersResponse extends SuccessReponse {
    public data: Array<IOrder>

    constructor(orders: Array<IOrder>) {
        super("orders retrieved successfully");
        this.data = orders;
    }

}

export default AllOrdersResponse;