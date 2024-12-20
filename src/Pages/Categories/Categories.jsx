import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Categories() {
    const [subCat, setsubCat] = useState(null)
    const [subTilte, setsubTilte] = useState("")
    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getAllCategories",
        queryFn: getAllCategories
    })
    // console.log(data?.data?.data);

    if (isLoading) {
        return <>
            <Loading />
        </>
    }
    if (isError) {
        return <>
            <h2>fe error: {error}</h2>
        </>
    }
    async function getSbCat(id) {
        const loadingId = toast.loading("Loading subcategories....")
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
        console.log(data);
        setsubCat(data?.data)
        } catch (error) {
            console.log(error);
            
        }finally{
            toast.dismiss(loadingId)
        }
        

    }
    return (
        <>
            <Helmet>
                <title>FreshCart - Categories</title>
            </Helmet>
            <h2 className="text-3xl text-primary-700 text-center mb-4">Categories</h2>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data?.data?.data?.map((category) => <div key={category?._id} className="px-5 ">
                    <div onClick={() => {
                        // console.log();
                        setsubTilte(`${category?.name} subcategories`)
                        getSbCat(category?._id)
                    }} className="shadow-md p-3 transition-shadow h-full flex flex-col justify-between hover:shadow-[1px_1px_10px_1px_rgba(79,167,79,1)]">
                        <img src={category?.image} className="w-full h-full object-cover" alt="" />
                        <h4 className="text-center p-3 text-[#198754] text-[25px] font-semibold">{category?.name}</h4>
                    </div>
                </div>)}
            </div>
            <div>
                <h2 className="text-[#4fa74f] my-[24px] text-[calc(1.325rem+.9vw)] text-center font-semibold">{subTilte}</h2>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {subCat?.map((sub) => <>
                        <div className="flex justify-center items-center text-center border border-solid rounded-md border-[#00000027] p-[16px] hover:shadow-[1px_1px_10px_1px_rgba(79,167,79,1)] transition-shadow"><h3 className="text-[calc(1.3rem+.2vw)]">{sub?.name}</h3></div>
                    </>)}
                </div>
            </div>
        </>
    )
}
