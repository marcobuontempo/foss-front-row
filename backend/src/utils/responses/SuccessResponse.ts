interface SuccessReponseArgs {
  message?: string;
  data?: Array<any> | object;
}

export class SuccessResponse {
  public success: boolean = true;
  public message?: string = undefined;
  public data?: Array<any> | object = undefined;

  constructor(args: SuccessReponseArgs) {
    this.message = args.message;
    this.data = args.data;
  }
}

export default SuccessResponse;