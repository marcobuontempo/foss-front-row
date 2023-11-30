import SuccessResponse from "./SuccessResponse";

class DeleteUserResponse extends SuccessResponse {
    constructor() {
        super("user has been deleted successfully");
    }
}

export default DeleteUserResponse;