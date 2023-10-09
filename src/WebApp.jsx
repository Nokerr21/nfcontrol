import "./styles.css"
import Navbar from "./Navbar"
import { Route, Routes } from "react-router-dom"
import User from "./pages/User"
import Worker from "./pages/Worker"
import Home from "./pages/Home"


export default function WebApp(){
    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className="container">
                <Routes>
                    <Route path="/nfcontrol/" element={<Home />} />
                    <Route path="/nfcontrol/worker" element={<Worker />} />
                    <Route path="/nfcontrol/user" element={<User />} />
                </Routes>
            </div>
        </>
    )  
}