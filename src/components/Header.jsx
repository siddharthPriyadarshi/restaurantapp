import React from 'react'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';


const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue();

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });

            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }

    };

    return (
        <header className="fixed w-screen bg-slate-300 p-6 px-16 ">
            {/* desktop and tablet */}
            <div className="hidden md:flex w-full p-4 items-center justify-between">
                <Link to={"/"} className='flex items-center gap-2'>
                    <img src={Logo} className="w-10 object-cover" alt="logo" />
                    <p className=' = "text-headingColor text-xl font-bold'>City</p>
                </Link>

                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Menu</li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">About Us</li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Service</li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Home</li>
                    </ul>

                    <div className='relative flex items-center'>
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                            <p className="text-xs text-white font-semibold">2</p>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w[40px] h-10 min-h[40px] drop-shadow-2xl cursor-pointer rounded-full"
                            alt="userprofile"
                            onClick={login}
                        />

                        <div className="w-40 bg-gray-50 shadow-xl rounded-xl flex flex-col absolute top-12 right-0">  
                            <p className = "px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd /></p>
                            <p className = "px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">Logout <MdLogout /></p>
                        </div>
                    </div>
                </div>
            </div>


            {/* mobile */}
            <div className="flex md:hidden p-4 "></div>
        </header>

    )
}

export default Header