import React from "react";
import './Cast.css'
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from '../../../asset/avatar.png';

const Cast = ({data,loading}) => {
    const {url} = useSelector((state)=>state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="castSection">
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="castlistItems">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="castlistItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} className="castImage"/>
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
        </div>
    )
}

export default Cast;
