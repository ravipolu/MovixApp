import React, { useEffect, useState } from "react"
import './HeroBanner.css'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch.js";
import Img from "../../../components/lazyLoadImage/Img";


const HeroBanner = () => {

    const history = useNavigate();
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");


    const { url } = useSelector((state) => state.home);
    const { loading, data } = useFetch("/movie/upcoming");

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            history(`/search/${query}`)
        }
    }

    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    return (
        <div className="heroBanner">
            {!loading && 
                (<div className="backdrop-img">
                    <Img className="backgroundImg" src={background} />
                </div>)
            }

            <div className="opacity"></div>
                <div className="heroBannerContent">
                    <span className="bannerTitle">Welcome</span>
                    <span className="bannerSubTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="permanentSearchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or TV show..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}></input>
                        <button onClick={()=>history(`/search/${query}`)}>Search</button>
                    </div>
                </div>
        </div>
    )
}
export default HeroBanner;