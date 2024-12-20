import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/freshcart-logo.svg"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { CartContext } from "../../Context/CartContext"

export default function Navbar() {
    let { numOfItems } = useContext(CartContext)
    let { userLogin, setUserLogin } = useContext(UserContext)
    // console.log(x);

    return (
        <>
            <nav className="bg-slate-100 py-3 shadow-sm fixed top-0 left-0 right-0 z-[100]">
                <div className="container flex flex-col lg:flex-row lg:justify-between lg:items-center ">
                    <div className="flex justify-between items-center">
                        <Link to="/">
                            <img src={logo} alt="freshcard logo" />
                        </Link>
                        <a className="text-[30px] lg:hidden cursor-pointer" onClick={() => {
                            document.getElementById("tabs").classList.toggle("hidden")
                        }}><i className="fa-solid fa-bars"></i></a>
                    </div>
                    <div className="  flex-col lg:flex-row hidden items-center grow h-auto overflow-hidden py-3 lg:h-auto lg:flex" id="tabs">
                        <ul className="flex flex-col lg:flex-row gap-5 items-center">
                            {userLogin !== null ? <>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/products">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/categories">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/brands">Brands</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/wishlist">Wishlist</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `translate-y-[1px] relative flex before:absolute before:w-0  before:h-[2px] before:bg-primary-800 before:left-0 before:bottom-[1px] hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/cart"><span>Cart</span> <div className="cart  relative">
                                            <i className="fa-solid fa-cart-shopping  text-lg"></i>
                                            <div className="cart-counter flex justify-center items-center h-5 w-5 rounded-full right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-primary-800 text-white absolute">
                                                {numOfItems}
                                            </div>
                                        </div></NavLink>
                                </li>
                            </> : ""}

                        </ul>
                        <ul className="lg:flex gap-5 hidden items-center ml-auto">
                            <li>
                                <a href="https://instagram.com" target="_blank">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://tiktok.com" target="_blank">
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com" target="_blank">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className=" flex flex-col lg:flex-row  gap-5 items-center lg:ml-auto mt-3 lg:mt-0">
                            {userLogin == null ? <>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/signup">sign up</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/login">login</NavLink>
                                </li>
                            </> : <>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                                    }} to="/profile">Profile <i className="fa-regular fa-circle-user"></i></NavLink>
                                </li>
                                <li>
                                    <Link to="/login" onClick={() => {
                                        localStorage.removeItem("userToken")
                                        localStorage.removeItem("userEmail")
                                        setUserLogin(null)
                                    }}>
                                        <i className="fa-solid fa-right-from-bracket text-lg"></i>
                                    </Link>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
