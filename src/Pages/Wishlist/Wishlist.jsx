import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"


export default function Wishlist() {
    let { wishListProducts, deleteItemFromWishList, addToCart } = useContext(CartContext)
    async function addProductToCart(id) {
        const loadingId = toast.loading("Adding....")
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
    return (
        <>
            <Helmet>
                <title>FreshCart - Wishlist</title>
            </Helmet>
            {wishListProducts?.map((prod) => (
                <>
                    <div className="border-y py-2 px-3 sm:px-0 border-[#e0e0e0] border-solid  flex flex-col sm:flex-row items-center">
                        <div className="sm:w-1/4 w-full">
                            <Link to={`/ProductDetails/${prod.id}/${prod.category.name}`}>
                                <img src={prod?.imageCover} alt="" />
                            </Link>
                        </div>
                        <div className="sm:w-1/2 w-full text-center sm:text-start">
                            <h2 className='text-2xl'>{prod?.title}</h2>
                            <h2 className='font-bold text-primary-500'>{prod?.category?.name}</h2>
                            <span className="block">{prod?.price} EGP</span>
                            <span className="block"><i className="fa-solid fa-star text-yellow-300"></i> {prod?.ratingsAverage}</span>
                        </div>
                        <div className=" sm:w-1/4  w-full">
                            <button onClick={() => { addProductToCart(prod?.id) }} className='btn w-full text-white  bg-primary-600 hover:bg-primary-700'>add to cart</button>
                            <button onClick={() => { deleteItemFromWishList(prod?.id) }} className='btn w-full text-white  bg-red-600 hover:bg-red-700 mt-3'>remove <i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}
