import React,{useRef} from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"

import Img from "../lazyLoadImage/Img";
import PosterFallback from '../../asset/no-poster.png';
import './carousel.css'
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel =({data , loading, endpoint })=>{

    const carouselContainer = useRef();
    const { url } = useSelector((state)=> state.home);
    const navigate = useNavigate();


    const navigation=(dir)=>{
        const container = carouselContainer.current;
        console.log(container);
        const scrollAmount = ( dir === "left" ? container.scrollLeft - (container.offsetWidth ) : container.scrollLeft + (container.offsetWidth ))

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }


    const skItem = () =>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="sktextBlock skeleton">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carouselDiv">
            <div>
                <BsFillArrowLeftCircleFill 
                    className="carouselLeftNav arrow"
                    onClick={()=> navigation("left")}
                />
                <BsFillArrowRightCircleFill 
                    className="carouselRightNav arrow"
                    onClick={()=> navigation("right")}
                />
                {!loading ? 
                (<div className="carouselItems" ref={carouselContainer}>
                    {
                        data?.map((item)=>{
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return (
                                <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)} >
                                    <div className="carouselPosterBlock">
                                        <Img src={posterUrl} className="carouselPosterCard" />
                                        <CircleRating  rating={item.vote_average.toFixed(1)}/>
                                        <Genres  data={item.genre_ids?.slice(0,2)} />
                                    </div>
                                    <div className="aboutMovie">
                                        <span className="movieTitle">
                                            {item.title || item.name}
                                        </span>
                                        <span className="movieReleaseDate">
                                            {dayjs(item.relase_Date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> ): (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                ) }

            </div>
        </div>
    )
}

export default Carousel;

