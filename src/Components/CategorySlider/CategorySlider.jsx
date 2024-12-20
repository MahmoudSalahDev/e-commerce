import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: false,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: "getAllCategories",
        queryFn: getAllCategories
    })

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

    return (
        <>
            <h2 className="text-xl">Shop Popular Categories</h2>
            <Slider {...settings}>
                {data?.data?.data.map((category) => <div key={category._id}>
                    <img src={category.image} className="h-[200px] w-full object-cover" alt="" />
                    <h4>{category.name}</h4>
                </div>)}
            </Slider>
        </>

    )
}
