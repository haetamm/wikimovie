import Logo from "./Logo";

const Navbar = () => {
    return (
        <>
            <div className="kontener mx-auto">
                <div className="flex justify-between items-center h-[5.5rem] xl:px-0 relative px-5">                
                    <Logo />
                    <button className=" py-1 rounded-md px-6 bg-red-700 text-white">Sign In</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;