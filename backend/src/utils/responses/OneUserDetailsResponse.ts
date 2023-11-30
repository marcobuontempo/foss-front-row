import SuccessReponse from "./SuccessResponse";
import { IUserDetail } from "@models/UserDetail.model";

class OneUserDetailsResponse extends SuccessReponse {
    public data: IUserDetail;

    constructor(user: IUserDetail) {
        super("user details retrieved successfully");
        this.data = user;
    }
}

export default OneUserDetailsResponse;