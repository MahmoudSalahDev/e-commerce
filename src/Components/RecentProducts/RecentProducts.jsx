import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'


export default function RecentProducts() {
    const [products, setproducts] = useState(null)
    const [filtered, setfiltered] = useState(null)

    let { addToCart, addToWishList, wishListProducts, deleteItemFromWishList } = useContext(CartContext)

    async function addProductToWishList(id) {
        const loadingId = toast.loading("adding....")
        try {
            let { data } = await addToWishList(id)
            if (data?.status == "success") {
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);

        }finally{
            toast.dismiss(loadingId)
        }
    }

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
        queryFn: getAllProducts
    })

    useEffect(() => {
        setproducts(data?.data?.data)
        setfiltered(data?.data?.data)
    }, [data])

    
    
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
// let filter =[]
    return <>
        <Helmet>
            <title>FreshCart - Home</title>
        </Helmet>
        
        <div className='flex justify-center mt-4'>
            <input type="search" className='w-[70%] border border-solid rounded-[5px] py-[6px] px-[12px] my-3' onInput={(e)=>{
                if(e.target.value !=""){
                    // console.log(e.target.value);
                // console.log(products[0]?.title);
                setfiltered(products)
                
                
                let filter=  products?.filter(prod => prod?.title.toLowerCase().includes((e.target.value).toLowerCase()))
                // console.log(filter);
                // console.log(products);
                setfiltered(filter)
                }else{
                    setfiltered(products)
                }

                // setproducts(filter)
            }} placeholder='Search....' />
        </div>
        {/* {filtered} */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filtered?.map((product) => <div key={product.id} className="px-5 ">
                <div className="shadow-md p-3 h-full flex flex-col justify-between group">
                    <div className='box relative'>
                        <img src={product.imageCover} className='w-full' alt="" />
                        <div className='absolute bg-[#00000025] flex justify-center items-center inset-0 opacity-0 group-hover:opacity-100' >
                            <span className='flex gap-2'>
                                {wishListProducts?.some(prod => prod.id == product.id) ? <i onClick={() => { deleteItemFromWishList(product.id) }} className="fa-solid fa-heart  flex justify-center items-center cursor-pointer text-red-600 transition-colors  border-solid border-white rounded-full border-[2px] w-[30px] h-[30px]"></i> : <i onClick={() => { addProductToWishList(product.id) }} className="fa-solid fa-heart  flex justify-center items-center cursor-pointer text-black transition-colors  border-solid border-white rounded-full border-[2px] w-[30px] h-[30px]"></i>}
                                <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                                    <i className="fa-regular fa-eye text-white flex justify-center items-center cursor-pointer hover:text-green-600 transition-colors  border-solid border-white rounded-full border-[2px] w-[30px] h-[30px]"></i>
                                </Link>
                            </span>
                        </div>
                    </div>

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
}
