import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";


export default function Login() {
    let { getCartItems } = useContext(CartContext)
    let { setUserLogin } = useContext(UserContext)
    const [incorrectUserOrPassword, setIncorrectUserOrPassword] = useState(null)
    const navigate = useNavigate()

    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const validationSchema = object({
        email: string().required("Email is required").email("Enter a valid email"),
        password: string().required("password is required").matches(password, "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    })

    async function sendDataToLogin(values) {
        const loadingId = toast.loading("Waiting....")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                method: "POST",
                data: values
            }
            const { data } = await axios.request(options)
            // console.log(data);
            if (data.message == "success") {
                localStorage.setItem("userToken", data.token)
                localStorage.setItem("userEmail", data?.user?.email)
                setUserLogin(data.token)
                getCartItems()
                toast.success("Loged in successfully")
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }


        } catch (error) {
            // console.log(error);
            setIncorrectUserOrPassword(error.response.data.message)
        }
        finally {
            toast.dismiss(loadingId)
        }

    }


    const formik = useFormik({
        initialValues: {
            "email": "",
            "password": "",
        },
        validationSchema,
        onSubmit: sendDataToLogin
    })
    // console.log(formik.errors);

    return (
        <>
            <Helmet>
                <title>FreshCart - login</title>
            </Helmet>
            <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className="fa-regular fa-circle-user mr-2"></i> Login</h1>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                <div className="email">
                    <input type="email" className="form-control w-full" placeholder="type your Email" value={formik.values.email} onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>) : ""}
                </div>
                <div className="password">
                    <input type="password" className="form-control w-full" placeholder="type your Password" value={formik.values.password} onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} />
                    {formik.errors.password && formik.touched.password ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>) : ""}
                    {incorrectUserOrPassword ? <p className="text-red-500 text-sm mt-1">*{incorrectUserOrPassword}</p> : ""}
                    <Link to="/forgotPassword">
                        <span className="text-[#1612ff] text-sm">forgot password?</span>
                    </Link>
                </div>
                <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white w-full">Login</button>
            </form>
        </>
    )
}
