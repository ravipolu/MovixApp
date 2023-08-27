import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import "./CircularRating.css"


const CircleRating = ({rating}) => {
    return (
        <div className="movieReviewRating">
            <CircularProgressbar 
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: rating < 5 ? "red" : rating < 7 ? "Orange" : "green",
                })} 
            />
        </div>
    )
}

export default CircleRating;