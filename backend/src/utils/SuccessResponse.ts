class SuccessResponse {
  status: string;
  message: string;

  constructor(message: string) {
      this.status = 'success';
      this.message = message;
  }
}

export default SuccessResponse;