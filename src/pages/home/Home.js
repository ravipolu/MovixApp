import React from "react"

import HomeBanner from './heroBanner/HeroBanner.js'
import Trending from "../trending/trending.js";


const Home = () =>{
    return (
        <div className="homePage">
            <HomeBanner />
            <Trending />
        </div>
    )
}
export default Home;