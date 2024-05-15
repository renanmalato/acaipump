import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchCart from "./fetchCart";



const AddToCart = async(productId, quantity) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = 'http://localhost:3000/api/cart';
        const data = {
            cartItem: productId,
            quantity: quantity
        }

        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer '+ JSON.parse(token)
        };

        await axios.post(endpoint, data, {headers})
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message)
    }
};


export default AddToCart;