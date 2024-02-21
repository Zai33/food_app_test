import axios from "axios";

export const baseURL =
  "http://localhost:5001/fullstack-food-app-6d588/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: { Authorization: "Beaxier " + token },
    });
    return res.data.data;
    //console.log("name", name);
  } catch (err) {
    return null;
  }
};

// add new products
export const addNewItem = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//delete a product
export const deleteAProduct = async (product_name) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${product_name}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//get users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};
