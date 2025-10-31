import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Signup = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, isLoading, error } = useAuthStore()

    const handleSignUp = async (e) => {
        e.preventDefault()

        try {
            await signup(username, email, password)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    console.log("Username:", username, "\nEmail:", email, "\nPassword:", password)
    return (
        <div
            className='min-h-screen bg-center bg-no-repeat px-4 md:px-8 py-5'
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/netflix_banner.jpg)"
            }}>

            <div className='max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8  py-14 mx-auto mt-8'>
                <h1 className='text-3xl font-medium text-white mb-7 '>Sign Up</h1>

                <form
                    onSubmit={handleSignUp}
                    className='flex flex-col space-y-4'>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" placeholder='username'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base' />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder='email'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base' />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder='password' className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base' />

                    <button
                        disabled={isLoading}
                        type='submit'
                        className='w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer'>
                        Sign In
                    </button>
                </form>

                <div className='mt-5 text-[#737373] text-sm'>
                    <p className=''>Already have an Account? <span className='text-white font-medium cursor-pointer ml-2 hover:underline' onClick={() => navigate("/signin")}>Sign In Now</span></p>
                </div>
            </div>

        </div>
    )
}

export default Signup
