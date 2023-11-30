import { IOrder } from "@models/Order.model";
import SuccessReponse from "../SuccessResponse";

class OneOrderResponse extends SuccessReponse {
    public data: IOrder

    constructor(order: IOrder) {
        super("order retrieved successfully");
        this.data = order;
    }

}

export default OneOrderResponse;