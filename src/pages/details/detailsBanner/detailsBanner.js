import React, { Fragment, useState } from "react";
import './detailsBanner.css'
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from '../../../asset/no-poster.png';
import { PlayIcon } from './Playbtn.js';
import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState();
    const [videoId, setVideoId] = useState();

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state) => state.home);
    console.log(data);
    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "writer");

    const toHourAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }

    return (
        <div className="movieDetailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <Fragment>
                            <div className="content">
                                <div className="left">
                                    {data.poster_path ? (
                                        <Img className='moviePosterImg' src={url.backdrop + data.poster_path} />
                                    ) : (
                                        <Img className="moviePosterImg" src={PosterFallback} />
                                    )}
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className="subTitle">
                                        {data.tagline}
                                    </div>
                                    <Genres data={_genres} classname="detailPageGenres" />
                                    <div className="playRow">
                                        <CircleRating
                                            rating={data.vote_average.toFixed(1)}
                                        />
                                        <div className="playbtn" onClick={() => {
                                            setShow(true)
                                            setVideoId(video.key)
                                        }}>
                                            <PlayIcon />
                                            <span className="text">Watch Trailer</span>
                                        </div>
                                    </div>
                                    <div className="overView">
                                        <div className="heading">Overview</div>
                                        <div className="description">{data.overview}</div>
                                    </div>

                                    <div className="info">
                                        {data.status && (
                                            <div className="infoItem">
                                                <span className="textbold">
                                                    Status:{" "}
                                                </span>
                                                <span className="text">{data.status}</span>
                                            </div>
                                        )}
                                        {data.release_date && (
                                            <div className="infoItem">
                                                <span className="textbold">
                                                    Release Date:{" "}
                                                </span>
                                                <span className="text">{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                            </div>
                                        )}
                                        {data.runtime && (
                                            <div className="infoItem">
                                                <span className="textbold">
                                                    Runtime:{" "}
                                                </span>
                                                <span className="text">{toHourAndMinutes(data.runtime)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="creators">
                                    {
                                            director?.length > 0 && (
                                                <div className="creatorInfoItem">
                                                    <span className="cText">
                                                        Director:{" "}
                                                    </span>
                                                    <span className="cText">
                                                        {director.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                        {
                                            writer?.length > 0 && (
                                                <div className="creatorInfoItem">
                                                    <span className="cText">
                                                        Writer:{" "}
                                                    </span>
                                                    <span className="cText">
                                                        {writer.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        {
                                            data.created_by?.length > 0 && (
                                                <div className="creatorInfoItem">
                                                    <span className="cText">
                                                        Creator:{" "}
                                                    </span>
                                                    <span className="cText">
                                                        {data?.created_by?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />
                            <div className="opacity-layer"></div>
                        </Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <div className="left skeleton"></div>
                    <div className="right">
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner;



