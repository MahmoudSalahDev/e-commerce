
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline } from "react-detect-offline";


export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="container py-20 min-h-[80vh]">
                <Outlet />
            </div>
            <div className='fixed bottom-0 z-50'>
                <Offline><div className='p-2 bg-red-700 text-white'>Only shown offline (surprise!)</div></Offline>
            </div>
            <Footer />
        </>
    )
}
