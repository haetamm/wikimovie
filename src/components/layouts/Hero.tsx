
const Hero = () => {
    return (
        <div className="min-h-[50px] mt-10  max-w-screen-xl mx-auto flex justify-center pt-0  xs:pt-8 md:pt-6 lg:pt-10 px-4 xs:px-6">
          <div className="w-full xs:w-[70%] lg:w-[55%] flex justify-center mt-4 xs:mt-0">
            <div className="text-white text-center">
                <div className="text-4xl xs:text-3xl md:text-6xl font-bold">
                  Unlimited movies, TV shows, and more
                </div>
                <div className="text-md lg:text-xl mt-2 lg:font-bold">
                    Starts at IDR 54,000. Cancel anytime.
                </div>
                <div className="text-sm lg:text-md mt-2">
                    Ready to watch? Enter your email to create or restart your membership.
                </div>
            </div>
          </div>
        </div>
    )
}

export default Hero