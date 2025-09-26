
import Home from "../pages/Home";
import Artworks from "../pages/Artworks";
import Artists from "../pages/Artists";
import ArtworkDetail from "../pages/ArtworkDetail";
import ArtistDetail from "../pages/ArtistDetails";
import Uploads from "../pages/Uploads";
import MyCollection from "../pages/MyCollection";
import Purchase from "../pages/Purchase";
import SignupForm from "../Components/SignUpForm";
import LoginForm from "../Components/LoginForm";

const routes = [
    {path:"/", element:<Home />},
    {path:"/artworks", element:<Artworks />},
    {path:"/artists", element:<Artists />},
    {path:"/artworks/:id",element:<ArtworkDetail />},
    {path: "/artists/:id", element: <ArtistDetail /> },
    {path:"/uploads", element:<Uploads />},


    {path:"/login", element:<LoginForm />},
    {path:"/my-collection", element:<MyCollection />},
    {path:"/signup", element:<SignupForm />},
    { path: "/purchases", element: <Purchase /> }

]
export default routes
