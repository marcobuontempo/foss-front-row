import { IEvent } from "@models/Event.model";
import SuccessReponse from "../SuccessResponse";

class CreateNewEventResponse extends SuccessReponse {

    constructor() {
        super("event has been created successfully");
    }

}

export default CreateNewEventResponse;