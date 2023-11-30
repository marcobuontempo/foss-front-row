import { IEvent } from "@models/Event.model";
import SuccessReponse from "../SuccessResponse";

class AllEventsResponse extends SuccessReponse {
    public data: Array<IEvent>

    constructor(events: Array<IEvent>) {
        super("events retrieved successfully");
        this.data = events;
    }

}

export default AllEventsResponse;