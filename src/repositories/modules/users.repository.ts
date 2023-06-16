import Repository from "@/repositories/repository";
import axiosInstance from "@/repositories/instances/axios.instance";

export default new class UsersRepository extends Repository {
  constructor() {
    super('users');
  }

  async getList() {
    return await axiosInstance.get(`${this.resource}/list`)
  }

  async getAll(params: object) {
    return await axiosInstance.get(`${this.resource}`, {
      params
    })
  }

  async get(uuid: string) {
    return await axiosInstance.delete(`${this.resource}/${uuid}`)
  }
}();