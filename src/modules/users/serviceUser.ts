import axios from "axios";
import ResponseSearch from "./responseSearch";

class ServiceUser {
  static async getUserByname(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${params.search} in:name&type=Users&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
  static async getUserByFullname(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=fullname:${params.search}&type=Users&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
  static async getUserByLogin(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${params.search} in:login&type=Users&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
  static async getUserByEmail(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${params.search} in:email&type=Users&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
  static async getUserByOrganization(params: {
    search: string;
    page: number;
    per_page: number;
  }): Promise<ResponseSearch> {
    const res = await axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${params.search} in:email+type:org&type=Users&page=${params.page}&per_page=${params.per_page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return res.data;
  }
  static async getPerfil(
    urlProfile: string
  ): Promise<{ name: string; email: string }> {
    const res2 = await axios({
      method: "get",
      url: urlProfile,
    });
    return { name: res2.data.name, email: res2.data.email };
  }
}

export default ServiceUser;
