import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Payment() {
    const [isOnline, setisOnline] = useState(false)
    let navigate = useNavigate()

    let { cartId, allProducts, setallProducts, settotalPrice, setnumOfItems } = useContext(CartContext)

    async function cashOrder(values) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            shippingAddress: values
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        // console.log(data);
        if (data.status == "success") {
            toast.success("Your Products will come soon..")
            // console.log(allProducts);
            setallProducts(null)
            settotalPrice(0)
            setnumOfItems(0)
            navigate("/cart")
        }

    }

    async function payOnline(values) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
            shippingAddress: values
        }, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
        )
        // console.log(data);
        if (data.status == "success") {
            window.open(data.session.url)
        }
    }

    function detectPayment(values) {
        if (isOnline) {
            payOnline(values)
        } else {
            cashOrder(values)
        }
    }

    const formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        },
        onSubmit: detectPayment
    })
    // console.log(formik);

    return (
        <>
            <Helmet>
                <title>FreshCart - Payment</title>
            </Helmet>
            <h2 className="text-primary-600 py-4">Pay Now</h2>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                <div className="details">
                    <input type="text" className="form-control w-full" placeholder="details" value={formik.values.details} onChange={formik.handleChange} name="details" onBlur={formik.handleBlur} />
                </div>
                <div className="city">
                    <input type="text" className="form-control w-full" placeholder="city" value={formik.values.city} onChange={formik.handleChange} name="city" onBlur={formik.handleBlur} />
                </div>

                <div className="phone">
                    <input type="tel" className="form-control w-full" placeholder="phone" value={formik.values.phone} onChange={formik.handleChange} name="phone" onBlur={formik.handleBlur} />
                </div>
                <button onClick={() => { setisOnline(false) }} type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white w-full">Pay Cash</button>
                <button onClick={() => { setisOnline(true) }} type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white w-full">Pay Online</button>
            </form>
        </>
    )
}
