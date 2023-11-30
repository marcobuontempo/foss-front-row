import SuccessReponse from "./SuccessResponse";

class UpdateUserDetailsResponse extends SuccessReponse {
    constructor() {
        super("user details have been updated");
    }
}

export default UpdateUserDetailsResponse;