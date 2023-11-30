import { IEvent } from "@models/Event.model";
import SuccessReponse from "../SuccessResponse";

class GetOneEventResponse extends SuccessReponse {
    public data: IEvent

    constructor(event: IEvent) {
        super("event retrieved successfully");
        this.data = event;
    }

}

export default GetOneEventResponse;