import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/stockItem/AddItem";
import EditItem from "./pages/stockItem/EditItem";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


type Props = {}

const RouterApp = (props: Props) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/addItem" element={<AddItem />} />
                    <Route path="/editItem/:id" element={<EditItem />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterApp