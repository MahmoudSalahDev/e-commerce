import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider(props) {
    const [totalPrice, settotalPrice] = useState(0)
    const [cartId, setcartId] = useState(0)
    const [allProducts, setallProducts] = useState(null)
    const [numOfItems, setnumOfItems] = useState(0)
    const [wishListProducts, setwishListProducts] = useState(null)
    let headers = {
        token: localStorage.getItem("userToken")
    }

    function addToWishList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id
        }, {
            headers
        })
            .then((resp) => {
                getWishListItems()
                return resp
            })
            .catch((error) => {
                console.log(error);
                return error
            })
    }

    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        })
            .then((resp) => {
                getCartItems()
                return resp
            })
            .catch((error) => {
                console.log(error);
                return error
            })
    }
    async function getWishListItems(){
        try {
            let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("userToken")
                }})                
                setwishListProducts(data?.data)
        } catch (error) {
            console.log(error);
        }
        
    }

    function getCartItems() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((resp) => {
                setnumOfItems(resp.data.numOfCartItems)
                setallProducts(resp.data.data.products)
                setcartId(resp.data.cartId)
                settotalPrice(resp.data.data.totalCartPrice)
            })
            .catch((error) => { console.log(error); })
    }
    

    function updateCartItem(id, count) {
        const loadingId = toast.loading("Updating....")
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count,
        }, {
            headers
        })
            .then((resp) => {
                setnumOfItems(resp.data.numOfCartItems)
                setallProducts(resp.data.data.products)
                setcartId(resp.data.cartId)
                settotalPrice(resp.data.data.totalCartPrice)
            })
            .catch((error) => { console.log(error); })
            .finally(()=>{toast.dismiss(loadingId)})
    }

    function clearCart() {
        const loadingId = toast.loading("Clearing....")
        axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
        })
            .then(() => {
                setnumOfItems(0)
                setallProducts(null)
                settotalPrice(0)
            })
            .finally(()=>{toast.dismiss(loadingId)})
    }

    function deleteItem(id) {
        const loadingId = toast.loading("Removing....")
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        })
            .then((resp) => {
                setnumOfItems(resp.data.numOfCartItems)
                setallProducts(resp.data.data.products)
                setcartId(resp.data.cartId)
                settotalPrice(resp.data.data.totalCartPrice)
                toast.success("Item removed successfully")
            })
            .catch((error) => { console.log(error); })
            .finally(()=>{toast.dismiss(loadingId)})
    }
    async function deleteItemFromWishList(id) {
        const loadingId = toast.loading("removing....")
        try {
            let {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers
            })
            if(data?.status=="success"){
                getWishListItems()
                toast.success("Product removed  from your wishlist")
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            toast.dismiss(loadingId)
        }
        
        
        
    }

    useEffect(() => {
        getCartItems()
        getWishListItems()
    }, [])


    return <CartContext.Provider value={{ addToCart, getCartItems, allProducts, setallProducts, totalPrice, settotalPrice, numOfItems, setnumOfItems, updateCartItem, deleteItem, cartId, clearCart, addToWishList , deleteItemFromWishList , wishListProducts}}>
        {props.children}

    </CartContext.Provider>
}