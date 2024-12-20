import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Home from "./Pages/Home/Home"
import Layout from "./Components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import UserContextProvider from "./Context/UserContext"
import ProtectRoutes from "./Components/ProtectRoutes/ProtectRoutes"
import Products from "./Pages/Products/Products"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import Cart from "./Pages/Cart/Cart"
import CartContextProvider from "./Context/CartContext"
import Payment from "./Pages/Payment/Payment"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Brands from "./Pages/Brands/Brands"
import Categories from "./Pages/Categories/Categories"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import ResetCode from "./Pages/ResetCode/ResetCode"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import Profile from "./Pages/Profile/Profile"
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile"
import ChangePassword from "./Pages/ChangePassword/ChangePassword"
import Wishlist from "./Pages/Wishlist/Wishlist"
import NotFound from "./Pages/NotFound/NotFound"



let query = new QueryClient({

})


function App() {
  const router = createHashRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectRoutes><Home /></ProtectRoutes> },
        { path: "products", element: <ProtectRoutes><Products /></ProtectRoutes> },
        { path: "ProductDetails/:id/:category", element: <ProtectRoutes><ProductDetails /></ProtectRoutes> },
        { path: "cart", element: <ProtectRoutes><Cart /></ProtectRoutes> },
        { path: "profile", element: <ProtectRoutes><Profile /></ProtectRoutes> },
        { path: "updateProfile", element: <ProtectRoutes><UpdateProfile /></ProtectRoutes> },
        { path: "changePassword", element: <ProtectRoutes><ChangePassword /></ProtectRoutes> },
        { path: "categories", element: <ProtectRoutes><Categories /></ProtectRoutes> },
        { path: "brands", element: <ProtectRoutes><Brands /></ProtectRoutes> },
        { path: "wishlist", element: <ProtectRoutes><Wishlist /></ProtectRoutes> },
        { path: "payment", element: <ProtectRoutes><Payment /></ProtectRoutes> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "resetCode", element: <ResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "/*", element: <NotFound /> },

      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
            <ReactQueryDevtools />
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
