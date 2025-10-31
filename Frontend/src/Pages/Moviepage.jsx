import { Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

const Moviepage = () => {

    const [data, setData] = useState()
    const [recommendations, setRecommendations] = useState([])
    const [trailerKey, setTrailerKey] = useState(null)

    const { id } = useParams()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njk3MGFhMmQyY2I0MTI0NWY0NmI4YjM0MTljODhjMyIsIm5iZiI6MTc1NzE1Nzg0Mi4wMTgsInN1YiI6IjY4YmMxOWQyNjVlNjczMmQyZjliYmU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KXlrUSGw7b_1vCdlJ1oBuRl3U-09qAMeX3UP5xNgpOM'
        }
    };

    fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setRecommendations(res.results || []))
            .catch(err => console.error(err));


        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                const trailer = res.results?.find(
                    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
                );
                setTrailerKey(trailer ? trailer.key : null)
            })
            .catch(err => console.error(err));
    }, [id])




    if (!data) {
        return <div className='flex items-center justify-center h-screen'>
            <span className='text-xl text-red-500'>
                Loading...
            </span>
        </div>
    }

    return (
        <div className='min-h-screen bg-[#181818] text-white'>
            <div className='relative h-[60vh] flex items-end ' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className='absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent'></div>

                <div className='relative z-10 flex items-end p-3 gap-8'>
                    <img
                        className='rounded-lg shadow-lg w-52 hidden md:block'
                        src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="" />

                    <div>
                        <h1 className='text-4xl font-bold mb-2'>{data.title}</h1>
                        <div className='flex items-center gap-4 mb-2'>
                            <span>⭐ {data.vote_average?.toFixed(1)}</span>
                            <span>{data.release_date}</span>
                            <span>{data.runtime} min</span>
                        </div>
                        <div className='flex gap-2 flex-wrap mb-4'>
                            {data.genres.map((genre, index) => (
                                <span key={index} className='bg-gray-800 px-3 py-1 rounded-full text-sm'>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <p>{data.overview}</p>
                        <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target='_blank'>
                            <button className='cursor-pointer flex justify-center items-center bg-[#e50914] px-4 py-3 rounded-full text-white text-sm md:text-base mt-4'>
                                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' />
                                Watch Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='p-8'>
                <h2 className='text-2xl font-semibold mb-4'>Details</h2>
                <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
                    <div>
                        <ul className='flex flex-col gap-3'>
                            <li>
                                <span className='font-semibold text-white'>Status:</span>
                                <span className='ml-2'>{data.status}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Release:</span>
                                <span className='ml-2'>{data.release_date}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Original Language:</span>
                                <span className='ml-2'>{data.original_language.toUpperCase()}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Budget:</span>
                                <span className='ml-2'>{data.budget ? `$${data.budget.toLocaleString()}` : "NA"}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Production Companies:</span>
                                <span className='ml-2'>
                                    {data.production_companies && data.production_companies.length > 0
                                        ? data.production_companies.map((prod) => prod.name).join(", ")
                                        : "NA"
                                    }
                                </span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Production Countries:</span>
                                <span className='ml-2'>
                                    {data.production_countries && data.production_countries.length > 0
                                        ? data.production_countries.map((prod) => prod.name).join(", ")
                                        : "NA"
                                    }
                                </span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Spoken Languages:</span>
                                <span className='ml-2'>
                                    {data.spoken_languages && data.spoken_languages.length > 0
                                        ? data.spoken_languages.map((lang) => lang.name).join(", ")
                                        : "NA"
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className='flex-1'>
                        <h3 className='font-semibold text-white mb-2'>Tagline</h3>
                        <p className='italic text-gray-400 '>{data.tagline || "No tagline available"}</p>

                        <h3 className='font-semibold text-white mt-4'>Overview</h3>
                        <p className='italic text-gray-400 '>{data.overview}</p>
                    </div>
                </div>
            </div>

            {recommendations.length > 0 && (
                <div className='p-8'>
                    <h2 className='text-2xl font-semibold mb-4'>You might also like...</h2>
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                        {recommendations.slice(0, 10).map((rec) => (
                            <div key={rec.id} className='bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition'>
                                <Link to={`/movie/${rec.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`} alt={rec.title} />
                                </Link>
                                <div className='p-2 '>
                                    <h1 className='text-sm font-semibold'>{rec.title}</h1>
                                    <span className='text-xs text-gray-400'>{rec.release_date.slice(0, 4)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Moviepage;
