interface SuccessReponseArgs {
    message?: string;
    data?: Array<any> | object;
    token?: string;
}

export class SuccessResponse {
    public success: boolean = true;
    public message?: string = undefined;
    public data?: Array<any> | object = undefined;
    public token?: string | undefined = undefined;

    constructor(args: SuccessReponseArgs) {
        this.message = args.message;
        this.data = args.data;
        this.token = args.token;
    }
}

export default SuccessResponse;