
import Home from "../pages/Home";
import Artworks from "../pages/Artworks";
import Artists from "../pages/Artists";
import ArtworkDetail from "../pages/ArtworkDetail";
const routes = [
    {path:"/", element:<Home />},
    {path:"/artworks", element:<Artworks />},
    {path:"/artists", element:<Artists />},
    {path:"/artworks/:id",element:<ArtworkDetail />}
    // {path:"/login", element:<Login />},
    // {path:"/my-collection", element:<Mycollection />},
    // {path:"/uploads", element:<Uploads />},
    // {path:"/signup", element:<Signup />}
    // { path: "/purchases", element: <Purchases /> }

]
export default routes
