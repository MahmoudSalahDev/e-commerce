
import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { UserContext } from "../../Context/UserContext"
import { Helmet } from "react-helmet"



export default function ResetPassword() {
    let { setUserLogin } = useContext(UserContext)
    const navigate = useNavigate()
    async function sendNewPassword() {
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
            "email": `${formik.values.email}`,
            "newPassword": `${formik.values.newPassword}`,
        })
        if (data.token != "") {
            localStorage.setItem("userToken", data.token)
            setUserLogin(data.token)
            toast.success("The password has been reset")
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
        // console.log(data);
    }

    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const validationSchema = object({
        email: string().required("Email is required").email("Enter a valid email"),
        newPassword: string().required("password is required").matches(password, "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        reNewPassword: string().required("Confirm password is required").oneOf([ref("newPassword")], "Password and confirm password must be the same"),
    })
    const formik = useFormik({
        initialValues: {
            "email": "",
            "newPassword": "",
            "reNewPassword": "",
        },
        validationSchema,
        onSubmit: sendNewPassword
    })
    // console.log(formik);

    return (
        <>
            <Helmet>
                <title>FreshCart - profile</title>
            </Helmet>
            <form className="max-w-md mx-auto mt-12" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="emailReset" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="emailReset" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                    {formik.errors.email && formik.touched.email ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter new Password</label>
                    {formik.errors.newPassword && formik.touched.newPassword ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.newPassword}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="reNewPassword" id="reNewPassword" value={formik.values.reNewPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="reNewPassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Your Password</label>
                    {formik.errors.reNewPassword && formik.touched.reNewPassword ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.reNewPassword}</p>) : ""}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>
        </>
    )
}
