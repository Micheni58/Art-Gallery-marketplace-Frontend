
import Home from "../pages/Home";
import Artworks from "../pages/Artworks";
import Artists from "../pages/Artists";
import ArtworkDetail from "../pages/ArtworkDetail";
import ArtistDetail from "../pages/ArtistDetails";
import Uploads from "../pages/Uploads";
import MyCollection from "../pages/MyCollection";
import Purchase from "../pages/Purchase";

const routes = [
    {path:"/", element:<Home />},
    {path:"/artworks", element:<Artworks />},
    {path:"/artists", element:<Artists />},
    {path:"/artworks/:id",element:<ArtworkDetail />},
    {path: "/artists/:id", element: <ArtistDetail /> },
    {path:"/uploads", element:<Uploads />},

    // {path:"/login", element:<Login />},
    {path:"/my-collection", element:<MyCollection />},
    // {path:"/signup", element:<Signup />}
    { path: "/purchases", element: <Purchase /> }

]
export default routes
