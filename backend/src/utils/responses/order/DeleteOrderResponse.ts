import SuccessReponse from "../SuccessResponse";

class DeleteOrderResponse extends SuccessReponse {

    constructor() {
        super("order deleted successfully");
    }

}

export default DeleteOrderResponse;