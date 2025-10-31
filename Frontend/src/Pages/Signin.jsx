import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login, isLoading, error } = useAuthStore()


    const handleLogin = async (e) => {
        e.preventDefault()

        try {
         await login(username, password)
            toast.success("Logged in successfully")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className='min-h-screen bg-center bg-no-repeat px-4 md:px-8 py-5'
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/netflix_banner.jpg)"
            }}>

            <div className='max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8  py-14 mx-auto mt-8'>
                <h1 className='text-3xl font-medium text-white mb-7 '>Sign In</h1>

                <form
                    onSubmit={handleLogin}
                    className='flex flex-col space-y-4'>

                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" placeholder='username'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base' />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder='password'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base' />
 
                    {error && <p className='text-red-500'>{error}</p>}
                         
                    <button
                    disabled={isLoading}
                    type='submit'
                        className='w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer'>
                        Sign In
                    </button>
                </form>

                <div className='mt-5 text-[#737373] text-sm'>
                    <p className=''>New to Netflix? <span className='text-white font-medium cursor-pointer ml-2 hover:underline' onClick={() => navigate("/signup")}>Sign Up Now</span></p>
                </div>
            </div>

        </div>
    )
}

export default Signin
