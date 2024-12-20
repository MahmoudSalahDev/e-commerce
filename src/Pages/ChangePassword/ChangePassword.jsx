import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { UserContext } from "../../Context/UserContext"
import { Helmet } from "react-helmet"

export default function ChangePassword() {
    const navigate = useNavigate()
    let { setUserLogin } = useContext(UserContext)
    async function sendChangePassword() {
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
            "currentPassword": `${formik.values.currentPassword}`,
            "password": `${formik.values.password}`,
            "rePassword": `${formik.values.rePassword}`
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        // console.log(data);
        if (data?.message == "success") {
            toast.success("Password changed successfully")
            localStorage.removeItem("userToken")
            localStorage.removeItem("userEmail")
            setUserLogin(null)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }
    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const validationSchema = object({
        currentPassword: string().required("Current password is required").matches(password, "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        password: string().required("New password is required").matches(password, "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        rePassword: string().required("Repassword is required").oneOf([ref("password")], "Password and Repassword must be the same"),
    })
    const formik = useFormik({
        initialValues: {
            "currentPassword": "",
            "password": "",
            "rePassword": "",
        },
        validationSchema,
        onSubmit: sendChangePassword
    })
    // console.log(formik);

    return (
        <>
            <Helmet>
                <title>FreshCart - profile</title>
            </Helmet>
            <form className="max-w-md mx-auto mt-12" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="currentPassword" id="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Current Password</label>
                    {formik.errors.currentPassword && formik.touched.currentPassword ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.currentPassword}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter New Password</label>
                    {formik.errors.password && formik.touched.password ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Your New Password</label>
                    {formik.errors.rePassword && formik.touched.rePassword ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.rePassword}</p>) : ""}
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                    <Link to="/profile" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Cancel</Link >
                </div>
            </form>
        </>
    )
}
