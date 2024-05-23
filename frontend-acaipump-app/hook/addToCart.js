import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchCart from "./fetchCart";

const AddToCart = async (productId, quantity) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://localhost:3000/api/cart";
    const data = {
      cartItem: productId,
      quantity: quantity,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    };

    const response = await axios.post(endpoint, data, { headers });

    // Fetch the updated cart data
    const updatedCart = await fetchCart();

    // Return the updated cart data
    return updatedCart.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default AddToCart;