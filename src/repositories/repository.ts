import axiosInstance from "@/repositories/instances/axios.instance";

export default abstract class Repository {
  public resource: string;
  protected httpCaller;

  protected constructor(resource?: string) {
    this.resource = resource ?? '';
    this.httpCaller = axiosInstance;
  }
}
