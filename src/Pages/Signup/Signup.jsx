import axios from "axios";
import { useFormik } from "formik"
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";


export default function Signup() {
    let { setUserLogin } = useContext(UserContext)
    // console.log(x);

    const navigate = useNavigate()

    // const [accountExistError, setAccountExistError] = useState(null)
    const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/g;
    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const validationSchema = object({
        name: string().required("Name is required").min(3, "Name must be more than 3 char").max(25, "Name must be less than 25 char"),
        email: string().required("Email is required").email("Enter a valid email"),
        password: string().required("password is required").matches(password, "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        rePassword: string().required("Repassword is required").oneOf([ref("password")], "Password and Repassword must be the same"),
        phone: string().required("phone is required").matches(phoneRegex, "Enter a Egyption phone number"),
    })

    async function sendDataToRegister(values) {
        const loadingId = toast.loading("Waiting....")

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                method: "POST",
                data: values
            }
            const { data } = await axios.request(options)
            if (data.message == "success") {
                localStorage.setItem("userToken", data.token)
                setUserLogin(data.token)
                toast.success("User created successfully")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)

            }
            // console.log(data);
        } catch (error) {
            toast.error(error.response.data.message)
            // setAccountExistError(error.response.data.message)


        }
        finally {
            toast.dismiss(loadingId)
        }

    }


    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        validationSchema,
        onSubmit: sendDataToRegister
    })
    // console.log(formik.errors);

    return (
        <>
            <Helmet>
                <title>FreshCart - SignUp</title>
            </Helmet>
            <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className="fa-regular fa-circle-user mr-2"></i> Register Now</h1>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                <div className="name">
                    <input type="text" className="form-control w-full" placeholder="type your name" value={formik.values.name} onChange={formik.handleChange} name="name" onBlur={formik.handleBlur} />
                    {formik.errors.name && formik.touched.name ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.name}</p>) : ""}
                </div>
                <div className="email">
                    <input type="email" className="form-control w-full" placeholder="type your Email" value={formik.values.email} onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>) : ""}
                </div>
                <div className="password">
                    <input type="password" className="form-control w-full" placeholder="type your Password" value={formik.values.password} onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} />
                    {formik.errors.password && formik.touched.password ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>) : ""}
                </div>
                <div className="rePassword">
                    <input type="password" className="form-control w-full" placeholder="Confirm your password" value={formik.values.rePassword} onChange={formik.handleChange} name="rePassword" onBlur={formik.handleBlur} />
                    {formik.errors.rePassword && formik.touched.rePassword ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.rePassword}</p>) : ""}
                </div>
                <div className="phone">
                    <input type="tel" className="form-control w-full" placeholder="type your Phone number" value={formik.values.phone} onChange={formik.handleChange} name="phone" onBlur={formik.handleBlur} />
                    {formik.errors.phone && formik.touched.phone ? (<p className="text-red-500 text-sm mt-1">*{formik.errors.phone}</p>) : ""}
                </div>
                <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white w-full">Sign Up</button>
            </form>
        </>
    )
}
