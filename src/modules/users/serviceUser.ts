import axios from "axios";
import ResponseSearch from "./responseSearch";

class ServiceUser {
  static async getUser(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${params.search} in:name&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
}

export default ServiceUser;
