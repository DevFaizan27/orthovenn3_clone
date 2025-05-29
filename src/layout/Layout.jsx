/* eslint-disable react/prop-types */

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"




const Layout = ({ children }) => {
    return (
        <div>
            <div className="">
                {/* <TopNavbar /> */}
                <Navbar />

                <div className="content  min-h-screen">
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout