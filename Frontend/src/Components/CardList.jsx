import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';

const CardList = ({ title, category }) => {

    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njk3MGFhMmQyY2I0MTI0NWY0NmI4YjM0MTljODhjMyIsIm5iZiI6MTc1NzE1Nzg0Mi4wMTgsInN1YiI6IjY4YmMxOWQyNjVlNjczMmQyZjliYmU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KXlrUSGw7b_1vCdlJ1oBuRl3U-09qAMeX3UP5xNgpOM'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                setData(res.results)
            })
            .catch(err => console.error(err));
        // console.log("Tilte:" ,title, "Category:",category)

    }, [])

    console.log(data)

    return (
        <div className='text-white md:px-4'>
            <h2 className='pt-10 pb-5 text-lg font-medium'>{title}</h2>
            <Swiper slidesPerView={"auto"} spaceBetween={10} navigation={true} modules={[Navigation]} className='mySwiper'>
                {data.map((d, index) => {

                    return <SwiperSlide key={index} className='max-w-72'>

                        <Link to={`/movie/${d.id}`}>
                            <img className='h-44 w-full object-center object-cover' src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`} alt="" />
                            <p className='text-center p-2'>{d.original_title}</p>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default CardList
