class SuccessResponse {
    public success: boolean;
    public message: string;

    constructor(message: string) {
        this.success = true;
        this.message = message;
    }
}

export default SuccessResponse;