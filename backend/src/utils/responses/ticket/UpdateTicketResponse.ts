import SuccessReponse from "../SuccessResponse";

class UpdateTicketResponse extends SuccessReponse {

    constructor() {
        super("ticket updated successfully");
    }

}

export default UpdateTicketResponse;