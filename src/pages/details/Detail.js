import React from "react"
import './Detail.css'
import DetailsBanner from "./detailsBanner/detailsBanner.js"


import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router"
import Trending from "../trending/trending"
import Cast from "./cast/Cast.js"
import VideoSection from "./videoSection/VideoSection.js"

const Detail = () =>{

    const { mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data: credits, loading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
    return (
        <div>
            <DetailsBanner video={data?.result?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideoSection data={data} />
            <Trending />
        </div>
    )
}
export default Detail;