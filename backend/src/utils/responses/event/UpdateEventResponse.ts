import { IEvent } from "@models/Event.model";
import SuccessReponse from "../SuccessResponse";

class UpdateEventResponse extends SuccessReponse {
    constructor() {
        super("event has been updated successfully");
    }

}

export default UpdateEventResponse;