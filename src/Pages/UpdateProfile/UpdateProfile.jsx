import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function UpdateProfile() {
    let { setUserLogin } = useContext(UserContext)
    const navigate = useNavigate()
    async function sendupdateProfile() {
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
            "name": `${formik.values.name}`,
            "email": `${formik.values.email}`,
            "phone": `${formik.values.phone}`
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        // console.log(data);
        if (data?.message == "success") {
            toast.success("Profile Updated successfully")
            localStorage.removeItem("userToken")
            localStorage.removeItem("userEmail")
            setUserLogin(null)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }
    const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/g;
    const validationSchema = object({
        name: string().required("Name is required").min(3, "Name must be more than 3 char").max(25, "Name must be less than 25 char"),
        email: string().required("Email is required").email("Enter a valid email"),
        phone: string().required("phone is required").matches(phoneRegex, "Enter a Egyption phone number"),
    })
    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "phone": "",
        },
        validationSchema,
        onSubmit: sendupdateProfile
    })
    // console.log(formik);
    return (
        <>
            <Helmet>
                <title>FreshCart - profile</title>
            </Helmet>
            <form className="max-w-md mx-auto mt-12" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
                    {formik.errors.name && formik.touched.name ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.name}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email</label>
                    {formik.errors.email && formik.touched.email ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>) : ""}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Your Phone number</label>
                    {formik.errors.phone && formik.touched.phone ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.phone}</p>) : ""}
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                    <Link to="/profile" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Cancel</Link >
                </div>

            </form>
        </>
    )
}
