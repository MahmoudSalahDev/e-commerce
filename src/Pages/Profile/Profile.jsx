import profileBg from "../../assets/images/profile.jpg"
import profileIcon from "../../assets/images/icon.png"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import ProfileSkeleton from "../../Components/ProfileSkeleton/ProfileSkeleton"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Profile() {
    // console.log(localStorage.getItem("userToken"));

    function getUsername() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getUsername",
        queryFn: getUsername,
    })
    // console.log(data);

    if (isLoading) {
        return <>
            <div className=" absolute top-0 left-0 right-0 h-[35%] overflow-hidden">
                <img src={profileBg} className="object-cover w-full h-full " alt="" />
            </div>
            <div className=" absolute left-0 right-0 top-[35%] flex flex-col items-center -translate-y-[50px]">
                <ProfileSkeleton />
            </div>
        </>
    }
    if (isError) {
        return <>

            <div className=" absolute top-0 left-0 right-0 h-[35%] overflow-hidden">
                <img src={profileBg} className="object-cover w-full h-full " alt="" />
            </div>
            <div className=" absolute left-0 right-0 top-[35%] flex flex-col items-center -translate-y-[50px]">
                <h2> error: {error}</h2>
            </div>

        </>
    }
    return (
        <>
            <Helmet>
                <title>FreshCart - profile</title>
            </Helmet>
            <div className=" absolute top-0 left-0 right-0 h-[35%] overflow-hidden">
                <img src={profileBg} className="object-cover w-full h-full " alt="" />
            </div>
            <div className=" absolute left-0 right-0 top-[35%] flex flex-col items-center -translate-y-[50px]">
                <img src={profileIcon} className="w-[100px] h-[100px]" alt="" />
                <div className="text-center">
                    <h2><span className="font-semibold">Username:</span> {data?.data?.decoded?.name}</h2>
                    <h2><span className="font-semibold">email:</span> {localStorage.getItem("userEmail")}</h2>
                    <h2><span className="font-semibold">ID:</span> {data?.data?.decoded?.id}</h2>
                    <h2><span className="font-semibold">role:</span> {data?.data?.decoded?.role}</h2>
                </div>
                <div className="flex flex-col gap-3 mt-3 text-center">
                    <Link to="/updateProfile" className="btn bg-primary-600 hover:bg-primary-700 text-white ">Update personal data</Link>
                    <Link to="/changePassword" className="btn bg-primary-600 hover:bg-primary-700 text-white ">Change Password</Link>
                </div>
            </div>
        </>
    )
}
