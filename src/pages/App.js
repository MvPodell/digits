import { Outlet } from "react-router-dom";
import { AuthUserProvider } from "../firebase/auth";

const App = () => {
    return(
            <div className = "App">
                <Outlet />
            </div>
    )
}

export default App