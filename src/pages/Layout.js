import { Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <div className = "container-fluid">
            <Outlet />
        </div>
    )
}

export default Layout