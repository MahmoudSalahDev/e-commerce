import img from "../../assets/images/error.svg"

export default function NotFound() {
    return (
        <>
            <div className='flex justify-center items-center '>
                <img src={img} className='w-full max-w-[600px] block' alt="notfound image" />
            </div>
        </>
    )
}
