import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = "Bearer " + localStorage.getItem("profile");
  }
  return req;
});

// User
export const fetchUser = () => API.get("/user");
export const login = (formData) => API.post("/user/signin", formData);
export const register = (formData) => API.post("/user/signup", formData);

// Item
export const fetchItems = (page) => API.get(`/products?page=${page}`);
export const fetchItemId = (id) => API.get(`/products/${id}`);
export const saveCart = (cart) => API.post("/items", cart);
export const placeOrder = (order) => API.post("/items", order);

//Category
export const fetchCategories = () => API.get("/categories");
export const fetchCategoryId = (id) => API.get(`/categories/product?id=${id}`);
