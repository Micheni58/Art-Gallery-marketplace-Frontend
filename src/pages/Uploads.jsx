function Uploads(){
    return(
        <>
        <div className="">        
            <div className="text-center">
                <h1 className="font-bold text-2xl">Upload Artwork</h1>
                <p>Share your creative work with the Artisan Community!</p>
            </div>
            <div className="w-150 items-">
                <form action="" className="grid p-4">
                    <label htmlFor="" className="font-bold">Artwork Image</label>
                    <input 
                    type="file" 
                    name="" 
                    id=""
                    className="border-1  h-20 text-center border-dashed rounded-sm" 
                    placeholder="Click to upload your artwork"/>
                    <label htmlFor="" className="font-bold">Title</label>
                    <input 
                    type="text" 
                    name="" 
                    id=""  
                    placeholder="Enter artwork title"
                    className="bg-gray-100 h-10"/>
                    <label htmlFor="" className="font-bold">Description</label>
                    <input 
                    type="text" 
                    name="" 
                    id=""
                    placeholder="Describe your artwork, insiration,techniques used..."
                    className="bg-gray-100 h-10 " />
                    <button className="bg-blue-300 rounded hover:bg-purple-300 mt-5 active:ring-2 ring-purple-400 p-2">
                        Upload Artwork
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Uploads;