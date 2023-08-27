
import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MovieCard.css";
import Img from "../lazyLoadImage/Img.js";
import CircleRating from "../circleRating/CircleRating.js";
import Genres from "../genres/Genres.js";
import PosterFallback from "../../asset/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {

    console.log(data)
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} classname="cardGenres"/>
                    </>
                )}
            </div>
            <div className="cardTextBlock">
                <span className="cardTitle">{data.title || data.name}</span>
                <span className="cardDate">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
