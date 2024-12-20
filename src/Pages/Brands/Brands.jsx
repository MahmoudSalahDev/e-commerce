import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function Brands() {

    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getAllBrands",
        queryFn: getAllBrands
    })


    if (isLoading) {
        return <>
            <Loading />
        </>
    }
    if (isError) {
        return <>
            <h2>fe error : {error}</h2>
        </>
    }
    return (
        <>
            <Helmet>
                <title>FreshCart - Brands</title>
            </Helmet>
            <h2 className="text-3xl text-primary-700 text-center mb-4">All Brands</h2>
            <div className="row gap-y-3">
                {data?.data?.data?.map((brand) => <div key={brand._id} className="w-1/6 px-5" onClick={() => {
                    Swal.fire({
                        title: brand.name,
                        text: brand.name,
                        imageUrl: brand.image,
                        position:'top',
                        showCancelButton: true,
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: {
                            popup: 'custom-swal-popup',
                            title: 'custom-swal-title',
                            htmlContainer: 'custom-swal-text'
                        },
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        // hideClass: {
                        //     popup: 'animate__animated animate__fadeInUp'
                        // }
                    });
                }}>
                    <img src={brand.image} className="w-full" alt={brand.name} />
                    <h4>{brand.name}</h4>
                </div>)}
            </div>
        </>
    )
}
