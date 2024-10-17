import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

interface iconInterface {
    icon: JSX.Element
}
const Footer = () => {
    const categories = [ "Ipsum", "Loram", "Dolor", "Istamet" ];
    const links = [ "About Us", "Contact Us", "Contribute", "Privacy Policy", "Sign In" ];

    const icons: iconInterface[] = [
        {   
            icon: <FaInstagram className="w-7 h-7" />,
        },
        {
            icon: <FaFacebook className="w-7 h-7"/>,
        },
        {
            icon: <FaYoutube className="w-7 h-7" />,
        },
        {
            icon: <FaSquareXTwitter className="w-7 h-7" />,
        },
        {
            icon: <FaTiktok className="w-7 h-7" />,
        },
    ];

    return (
        <>
            <footer className="kontener mb-1 md:mb-4 mx-auto text-white mt-60 px-5">
            <hr/>
            <hr/>

                <div className="inline-block xs:flex gap-6">
                    <div className="w-full xs:w-[60%]">
                        <div className="text-lg font-bold mt-5 mb-2 underline">About</div>
                        <p className="text-justify text-sm">Bogasaha.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                    </div>

                    <div className="w-full xs:w-[20%]">
                        <div className="text-lg font-bold mt-5 mb-2 underline">Categories</div>
                        <ul className="text-sm">
                            { categories.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full xs:w-[20%]">
                        <div className="text-lg font-bold mt-5 mb-2 underline">Quick Links</div>
                        <ul className="text-sm">
                        { links.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                        </ul>
                    </div>
                </div>
                <hr className="my-3"/>
                <div className="inline-block md:flex justify-center md:justify-between items-center w-full ">
                    <p className=" text-center md:text-start">Copyright &copy; 2024 All Rights Reserved by 
                        <a href="#"> Boga Saha?</a>.
                    </p>

                    <div className="flex justify-center">
                        { icons.map(({icon}, index) => (
                            <ul key={index}  className="flex items-center justify-center">
                                <li className="p-2">{icon}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer