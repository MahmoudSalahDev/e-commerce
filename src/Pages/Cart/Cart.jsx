import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import emptyCart from "../../assets/images/emptyCart.png"

export default function Cart() {
    let { allProducts, totalPrice, numOfItems, updateCartItem, deleteItem, clearCart } = useContext(CartContext)


    return (
        <>
            <Helmet>
                <title>FreshCart - Cart</title>
            </Helmet>
            <div className="flex justify-between items-center">
                <h2 className="text-primary-700 text-4xl font-bold my-5 ">Shop Now</h2>
                {numOfItems == 0 ? "" : <button onClick={() => { clearCart() }} className="btn bg-red-600 hover:bg-red-700 text-white h-fit">Clear Cart <i className="fa-solid fa-trash-can"></i></button>}
            </div>
            {numOfItems == 0 ? <>
                <div className="flex flex-col justify-center items-center">
                    <img src={emptyCart} alt="emptyCart image" className="w-full max-w-[500px]" />
                    <h2 className="text-[#ff8c00] font-semibold text-2xl">Cart is Empty</h2>
                </div>
            </> : <div>
                <div className="bg-gray-300 text-center">
                    <h3 className="text-2xl">Num Of Cart Items: <span className="text-primary-700">{numOfItems}</span></h3>
                    <h3 className="text-2xl">Total Price: <span className="text-primary-700">{totalPrice}</span></h3>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts?.map((prod) => {
                                return <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <Link to={`/ProductDetails/${prod?.product?.id}/${prod?.product?.category?.name}`}>
                                                <img src={prod?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {prod.product.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <button onClick={() => { updateCartItem(prod.product._id, prod.count - 1) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <div>
                                                    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={prod.count} required disabled />
                                                </div>
                                                <button onClick={() => { updateCartItem(prod.product._id, prod.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {prod.price} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <a onClick={() => { deleteItem(prod.product._id) }} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                        </td>
                                    </tr>
                                </>
                            })}
                        </tbody>
                    </table>
                    <Link to='/payment'><button className="btn text-white bg-primary-700 my-3 w-full py-3 hover:bg-primary-900">Pay Now</button></Link>
                </div>
            </div>}


        </>
    )
}
