import { IEvent } from "@models/Event.model";
import SuccessReponse from "../SuccessResponse";

class DeleteEventResponse extends SuccessReponse {

    constructor() {
        super("event has been deleted successfully");
    }

}

export default DeleteEventResponse;