import React from "react";
import logo from './images/cropped-victoria-forest-logo.png';

function Footer(props) {
    
    return (
        <footer className="bg-white border-t border-gray-400 shadow">
            <div className="container max-w-md mx-auto flex py-8">

                <div className="w-full mx-auto flex flex-wrap">
                    <div className="flex w-full ">
                        <div className="px-8">
                            <img src={logo}/>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
