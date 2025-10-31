import { HelpCircle, LogOut, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { user, logOut } = useAuthStore()
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    const avatarUrl = user ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}` : "";

    const handleLogout = async () => {
        const { message } = await logOut()
        toast.success("Logout Successfully")
        setShowMenu(false)
        navigate("/signin", { replace: true })
    }
    return (
        <nav className="flex bg-black text-gray-200 justify-between items-center 
        p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
            <Link to={"/"}>
                <img className='w-32 brightness-125 cursor-pointer' src="/logo.png" alt="" />
            </Link>

            <ul className="hidden md:flex space-x-6 ">
                <li className="cursor-pointer hover:text-[#e50914]">Home</li>
                <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
                <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
                <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
                <li className="cursor-pointer hover:text-[#e50914]">Games</li>
                <li className="cursor-pointer hover:text-[#e50914]">New Popular</li>
                <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
            </ul>

            <div className="flex items-center space-x-4 relative">
                <div className="relative hidden md:inline-flex">
                    <input className="bg-[#333333] px-4 py-2 rounded-full min-w-62 pr-10 outline-none" type="text" placeholder="Search" />
                    <Search className='absolute top-2 right-4 w-5 h-5 ' />
                </div>

                <Link to={user ? "airecommend" : "signin"}>
                    <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">Gen AI Movie Picks</button>
                </Link>

                {!user ? <Link to={"/signin"}>
                    <button className="border border-[#333333] py-2 px-4 cursor-pointer">
                        Sign In
                    </button>
                </Link> : <div className='text-white'><img onClick={() => setShowMenu(!showMenu)} src={avatarUrl} alt=""
                    className='w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer' />
                    {showMenu && (
                        <div className='z-50 absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg shadow-lg py-4 px-3 flex flex-col gap-2 border-[#333333] '>
                            <div className='flex flex-col items-center mb-2'>
                                <span className='text-white font-semibold text-base'>{user.username}</span>
                                <span className='text-sm text-gray-400'>{user.email}</span>
                            </div>

                            <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                                <HelpCircle className='w-5 h-5' />
                                Help Center
                            </button>

                            <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                                <Settings className='w-5 h-5' />
                                Settings
                            </button>

                            <button onClick={handleLogout} className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                                <LogOut className='w-5 h-5' />
                                Logout
                            </button>

                        </div>
                    )}
                </div>
                }


            </div>

        </nav>
    )
}

export default Navbar