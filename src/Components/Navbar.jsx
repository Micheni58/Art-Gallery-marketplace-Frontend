import { NavLink } from "react-router-dom"
function Navbar(){
    return(
        <>
        <div className="bg-gray-200">
            <nav className="flex gap-10 p-5">
                <span className="flex ">
                    <i class="fa-solid fa-palette"></i>
                    <h1>Artisan</h1>
                </span>
                
                <div className="flex gap-10 ml-50">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/artworks">Artworks</NavLink>
                <NavLink to="/my-collection">My Collection</NavLink>
                <NavLink to="/purchases">Purchase</NavLink>
                <NavLink to="/uploads">Upload</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </nav>
         </div>
        </>
    )
}
export default Navbar