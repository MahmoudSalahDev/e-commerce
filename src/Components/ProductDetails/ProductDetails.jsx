import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../Skeleton/Skeleton';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {

    const [prodDetails, setprodDetails] = useState(null)
    window.scrollTo(0, 0);
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
        } finally {
            toast.dismiss(loadingId)
        }

    }
    async function addProductToCart(id) {
        const loadingId = toast.loading("adding....")
        try {
            let { data } = await addToCart(id)
            if (data.status == "success") {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(loadingId)
        }

    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    let { id } = useParams()

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getProductDetails",
        queryFn: () => getProductDetails(id)
    })
    useEffect(() => {
        if (data) {
            setprodDetails(data?.data?.data);
        }
    }, [data]);
    if (isLoading) {
        return <>
            <Skeleton />
        </>
    }
    if (isError) {
        return <>
            <h2>fe error: {error}</h2>
        </>
    }
    return (
        <>
            <Helmet>
                <title>FreshCart - product</title>
            </Helmet>
            <div className="flex flex-col md:flex-row items-center mb-4">
                <div className="w-full md:w-1/4 p-2">
                    <div>
                        <Slider {...settings}>
                            {prodDetails?.images?.map((src) => <img key={`image`} src={src} className='w-full active:cursor-grab' alt="" />)}
                        </Slider>
                    </div>
                </div>
                <div className="md:w-3/4">
                    <div className='p-5'>
                        <h4 className='text-2xl'>{prodDetails?.title}</h4>
                        <p className='text-xl text-gray-500'>{prodDetails?.description}</p>
                        <span className='font-bold text-primary-500'>{prodDetails?.category?.name}</span>
                        <div className="row justify-between">
                            <span>{prodDetails?.price} EGP</span>
                            <span><i className="fa-solid fa-star text-yellow-300"></i>{prodDetails?.ratingsAverage}</span>
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={() => { addProductToCart(prodDetails?.id) }} className='btn w-full text-white bg-primary-600 hover:bg-primary-700'>add to cart</button>
                            <span>{wishListProducts?.some(prod => prod.id == prodDetails?.id) ? <i onClick={() => { deleteItemFromWishList(prodDetails?.id) }} className="fa-solid fa-heart  flex justify-center items-center cursor-pointer text-red-600 text-2xl transition-colors  border-solid border-white rounded-full border-[2px] w-[30px] h-[30px]"></i> : <i onClick={() => { addProductToWishList(prodDetails?.id) }} className="fa-solid fa-heart  flex justify-center items-center cursor-pointer text-xl text-black transition-colors  border-solid border-white rounded-full border-[2px] w-[30px] h-[30px]"></i>}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ReletedProducts /> */}

        </>
    )
}
