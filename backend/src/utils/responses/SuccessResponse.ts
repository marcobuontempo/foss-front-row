class SuccessResponse {
    public status: string;
    public message: string;

    constructor(message: string) {
        this.status = "success";
        this.message = message;
    }
}

export default SuccessResponse;