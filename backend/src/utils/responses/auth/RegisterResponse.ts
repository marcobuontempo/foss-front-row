import SuccessResponse from "../SuccessResponse";

class RegisterResponse extends SuccessResponse {
    constructor() {
        super("user registered successfully");
    }
}

export default RegisterResponse;