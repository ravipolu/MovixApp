import React,{useState} from "react"
import '../home/Home.css'
import SwitchTab from "../../components/switch/SwitchTab"
import useFetch from "../../hooks/useFetch"
import Carousel from "../../components/carousel/carousel"


const Trending = () => {

    const [endPoint, setEndPoint] = useState('day');
    const { data,loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange=(tab)=>{
        setEndPoint(tab === "Day" ? "day" : "week")
    };

    return (
        <div className="carouselSection">
            <div className="carouselBox">
                <span className="carouselTitle">Trending</span>
                <SwitchTab  data={["Day", "Week"]} onTabChange={onTabChange} />
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
        </div>
    )
}

export default Trending;