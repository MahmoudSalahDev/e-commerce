
import axios from "axios"
import { useFormik } from "formik"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"


export default function ResetCode() {
    const navigate = useNavigate()
    async function sendResetCode() {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            "resetCode": `${formik.values.resetCode}`
        })
        if (data.status == "Success") {
            // console.log("niceeeeee");

            toast.success("Reset Code Confirmed")
            setTimeout(() => {
                navigate("/resetPassword")
            }, 2000)
        }
        // console.log(data);
    }


    const validationSchema = object({
        resetCode: string().required("Reset Code is required").matches(/^[0-9]{1,10}$/, "please enter the reset code")
    })
    const formik = useFormik({
        initialValues: {
            "resetCode": "",
        },
        validationSchema,
        onSubmit: sendResetCode
    })
    // console.log(formik);

    return (
        <>
            <Helmet>
                <title>FreshCart - profile</title>
            </Helmet>
            <form className="max-w-md mx-auto mt-12" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="number" name="resetCode" id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block border-solid py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary-800 peer" placeholder=" " required />
                    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter reset code</label>
                    {formik.errors.resetCode && formik.touched.resetCode ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.resetCode}</p>) : ""}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>
        </>
    )
}
