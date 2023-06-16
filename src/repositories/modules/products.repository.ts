import Repository from "@/repositories/repository";
import axiosInstance from "@/repositories/instances/axios.instance";

export default new class ProductsRepository extends Repository {
  constructor() {
    super('products');
  }

  async getAll(params) {
    return await axiosInstance.get(`${this.resource}`, {
      params
    })
  }
  async get(id: number) {
    return await axiosInstance.get(`${this.resource}/${id}`)
  }

  async create(payload: object) {
    return await axiosInstance.post(`${this.resource}`, payload)
  }

  async update(id: number, payload: object) {
    return await axiosInstance.put(`${this.resource}/${id}`, payload)
  }

  async delete(id: number) {
    return await axiosInstance.delete(`${this.resource}/${id}`)
  }
}();