import axios from "axios";

class ApiService {
  static apiBase = process.env.REACT_APP_API_BASE;

  static async getCategoryProducts(category, pageNumber, sortId, prodName) {
    const res = await axios.get(
      `${this.apiBase}/category/${category}?page=${pageNumber}&sortId=${sortId}&prodName=${prodName}`
    );
    return res;
  }
  static async getProduct(productId) {
    const res = await axios.get(`${this.apiBase}/products/${productId}`);
    return res;
  }
  static async login(userData) {
    const res = await axios.post(`${this.apiBase}/login`, userData);
    return res;
  }
  static async register(userData) {
    const res = await axios.post(`${this.apiBase}/register`, userData);
    return res;
  }
  static async getCart() {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.get(`${this.apiBase}/get-cart`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  }
  static async addToCart(prodId) {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.post(
      `${this.apiBase}/add-to-cart`,
      { prodId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  }
  static async decrementCartProduct(prodId) {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.post(
      `${this.apiBase}/decrement-cart-product`,
      { prodId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  }
  static async removeCartProduct(prodId) {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.post(
      `${this.apiBase}/remove-from-cart`,
      { prodId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  }
  // admin
  static async addProduct(product) {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.post(`${this.apiBase}/add-product`, product, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  }
  static async deleteProductFromDb(prodId) {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const res = await axios.post(
      `${this.apiBase}/delete-product`,
      { prodId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  }
}

export default ApiService;
