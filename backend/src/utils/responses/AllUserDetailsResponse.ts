import SuccessReponse from "./SuccessResponse";
import { IUserDetail } from "@models/UserDetail.model";

class AllUserDetailsResponse extends SuccessReponse {
    public data: Array<IUserDetail>;

    constructor(users: Array<IUserDetail>) {
        super("user details retrieved successfully");
        this.data = users;
    }
}

export default AllUserDetailsResponse;