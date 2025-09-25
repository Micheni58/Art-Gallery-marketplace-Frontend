// This page is showing the list of artworks in the db
import ArtworkCard from "../Components/ArtworkCard";
function Artworks(){
    return (
        <>
        <div className="p-4 grid ">
            <h1 className="text-3xl">Artworks Page</h1>
            <p>Explore our curated collection 
            of exceptional artworks from talented artists around the world.
            </p>
            <ArtworkCard />
        </div>
        </>
    )
}
export default Artworks;