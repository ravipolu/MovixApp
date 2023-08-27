import React from "react";

import { useSelector } from "react-redux";
import "./Genres.css"

const Genres = ({data,classname}) => {

    const {genres} = useSelector((state)=> state.home);
    // console.log(genres);
    return(
        <div className="movieGenres">
            {data?.map((g)=>{
                if(!genres[g]?.name){
                    {/* console.log('hello') */}
                    return;
                }
                return (
                    <div key={genres[g].id} className={`genre  ${classname}`}>
                        {genres[g]?.name}
                    </div>
                )
            })}
        </div>
    ) 
} 

export default Genres;