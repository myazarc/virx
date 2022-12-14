export type IResponseService = {
  status: boolean;
  data: any;
  error: any;
};

export class ResponseService {
  private status = false;
  private data: any = null;
  private error: any = null;

  setStatus(status: boolean) {
    this.status = status;
  }

  setData(data: any) {
    this.data = data;
  }

  setError(error: any) {
    this.error = error;
  }

  get(): IResponseService {
    return {
      status: this.status,
      data: this.data,
      error: this.error,
    };
  }
}
