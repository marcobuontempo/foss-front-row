import SuccessReponse from "../SuccessResponse";
import { ITicket } from "@models/Ticket.model";

class OneTicketResponse extends SuccessReponse {
    public data: ITicket

    constructor(ticket: ITicket) {
        super("ticket retrieved successfully");
        this.data = ticket;
    }

}

export default OneTicketResponse;