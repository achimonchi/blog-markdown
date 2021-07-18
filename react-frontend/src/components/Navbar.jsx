import { Link } from "react-router-dom";


function Navbar(){
    return (
        <nav className="max-w-screen-xl mx-auto text-center p-3 flex flex-row justify-center">
            <Link to={"/"} className="mx-2">
                Home
            </Link>
            <Link to={"/courses"} className="mx-2">
                Courses
            </Link>
        </nav>
    )
}

export default Navbar;