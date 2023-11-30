import SuccessReponse from "../SuccessResponse";

class LoginResponse extends SuccessReponse {
    public token: string;

    constructor(token: string) {
        super("user logged in successfully");
        this.token = token;
    }
}

export default LoginResponse;