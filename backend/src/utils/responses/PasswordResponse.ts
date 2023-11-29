import SuccessResponse from "./SuccessResponse";

class PasswordResponse extends SuccessResponse {
    constructor() {
        super("password updated successfully");
    }
}

export default PasswordResponse;