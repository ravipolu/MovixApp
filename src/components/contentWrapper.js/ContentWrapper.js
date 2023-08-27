import React from "react";
import "./ContentWrapper.css";
const ContentWrapper = ({ childern }) => {
    return <div className="contentWrapper">
        {childern}
    </div>
};


export default ContentWrapper;