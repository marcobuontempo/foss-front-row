import SuccessReponse from "../SuccessResponse";
import { ITicket } from "@models/Ticket.model";

class AllTicketsResponse extends SuccessReponse {
    public data: Array<ITicket>

    constructor(tickets: Array<ITicket>) {
        super("tickets retrieved successfully");
        this.data = tickets;
    }

}

export default AllTicketsResponse;