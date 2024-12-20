import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"

export default function ReletedProducts() {
    let {  category } = useParams()

    let { addToCart } = useContext(CartContext)
    
    async function addProductToCart(id) {
        let { data } = await addToCart(id)
        if (data.status == "success") {
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    }

    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getAllProducts",
        queryFn: getAllProducts,
        select: (data)=>{
            return data?.data?.data?.filter((product) => product.category.name == category)
        }
    })



    if (isLoading) {
        return <>
            <Loading />
        </>
    }
    if (isError) {
        return <>
            <h2>fe error {error}</h2>
        </>
    }
    
    return (
        <>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data?.map((product) => <div key={product.id} className="px-5 group">
                    <div className="shadow-md p-3 h-full flex flex-col justify-between">
                        <Link onClick={()=>{
                        }} to={`/ProductDetails/${product.id}/${product.category.name}`}>
                            <img src={product.imageCover} className='w-full' alt="" />
                        </Link>
                        <span className="text-primary-500 text-xl">{product.category.name}</span>
                        <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                        <div className="row justify-between">
                            <span>{product.price} EGP</span>
                            <span><i className="fa-solid fa-star text-yellow-300"></i> {product.ratingsAverage}</span>
                        </div>
                        <button onClick={() => { addProductToCart(product.id) }} className='btn w-full text-white group-hover:opacity-100 transition-opacity opacity-0 bg-primary-600 hover:bg-primary-700'>add to cart</button>
                    </div>
                </div>)}
            </div>
        </>
    )
}
