import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import Moviepage from './Pages/Moviepage.jsx'
import Signin from './Pages/Signin.jsx'
import Signup from './Pages/Signup.jsx'
import AIRecommendations from './Pages/AIRecommendations.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />
            },
            {
                path:"/movie/:id",
                element:<Moviepage/>
            },
            {
                path:"/signin",
                element:<Signin/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
            {
                path:"/airecommend",
                element:<AIRecommendations/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />

)
