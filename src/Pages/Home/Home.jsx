
import RecentProducts from '../../Components/RecentProducts/RecentProducts'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import img1 from "../../assets/images/slider-image-3.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-image-1.jpeg"
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function Home() {



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (<>
        <Helmet>
            <title>FreshCart - Home</title>
        </Helmet>
        <div className='grid grid-cols-3'>
            <div className='col-span-2'>
                <Slider {...settings}>
                    <div className='w-full '>
                        <img src={img1} className='h-full w-full active:cursor-grab' alt="" />
                    </div>
                    <div className='w-full '>
                        <img src={img1} className='h-full w-full active:cursor-grab' alt="" />
                    </div>
                    <div className='w-full '>
                        <img src={img1} className='h-full w-full active:cursor-grab' alt="" />
                    </div>
                </Slider>
            </div>
            <div className='col-span-1 grid grid-rows-2'>
                <div>
                    <img src={img2} className='h-full' alt="" />
                </div>
                <div>
                    <img src={img3} className='h-full' alt="" />
                </div>
            </div>
        </div>
        <CategorySlider />
        <RecentProducts />

    </>

    )
}
