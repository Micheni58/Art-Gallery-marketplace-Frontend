import { NavLink } from "react-router-dom"
function Navbar(){
    return(
        <>
        <div className="bg-gray-200">
            <nav className="flex gap-2 p-5">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/artworks">Artworks</NavLink>
                <NavLink to="/my-collection">My Collection</NavLink>
                <NavLink to="/purchases">Purchase</NavLink>
                <NavLink to="/uploads">Upload</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </nav>
         </div>
        </>
    )
}
export default Navbar