function Footer(){
    return(
        <>
        <div className="bg-gray-100  w-full fixed bottom-0 pb-5">
        <section className="flex justify-center p-10 gap-20">

            <div className="w-1/3">
                <div className="flex ">
                    <i class="fa-solid fa-palette"></i>
                    <h2 className="font-bold">Artisan</h2>
                </div>
                <p>
                    Discover and collect exceptional artworks from 
                    talented artists worldwide. Your gateway to 
                    contemporary and modern art.
                </p>
            </div>
            <div className=" w-1/3 flex flex-col">
                <div>
                    <h2 className="font-bold">Quick Links</h2>
                    <span className="text-gray-500 grid grid-cols-1 ">
                        <a href="#" className="hover:text-black">About</a>
                        <a href="#" className="hover:text-black">Contact</a>
                        <a href="#" className="hover:text-black">Terms of Service</a>
                        <a href="#" className="hover:text-black">Privacy Policy</a>
                    </span>
                    
                </div>
                
            </div>
            <div className="w-1/3">
                
                <h2 className="font-bold">Follow Us</h2>
                <div className="flex gap-4">
                <span className="hover:bg-white rounded-sm">
                    <i class="fa-brands fa-instagram"></i>
                </span>
                <span className="hover:bg-white rounded-sm">
                    <i class="fa-brands fa-twitter"></i>
                </span>
                <span className="hover:bg-white rounded">
                    <i class="fa-brands fa-facebook"></i>
                </span>
                 </div>
            </div>
        </section>

        <section className="border-t-1 border-gray-400 ">
            <div className="text-center pt-5">
                <p>&copy;2025 Artisan Gallery.All rights reserved</p>
            </div>
        </section>

        </div>
        </>
    )
}
export default Footer;