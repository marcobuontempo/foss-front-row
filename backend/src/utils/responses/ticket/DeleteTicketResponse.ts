import SuccessReponse from "../SuccessResponse";

class DeleteTicketResponse extends SuccessReponse {

    constructor() {
        super("ticket deleted successfully");
    }

}

export default DeleteTicketResponse;