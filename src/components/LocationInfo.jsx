import React from "react";
import "./styles/locationInfo.css";

const LocationInfo = ({ infoLoc }) => {

return (
    <article className="location">
        <h2 className="location__name">{infoLoc?.name}</h2>
        <ul className="location__list">
            <li className="location__item">
                <span className="location__label">Type: </span>
                {infoLoc?.type}
            </li>
            <li className="location__item">
                <span className="location__label">Dimension: </span>
                {infoLoc?.dimension}
            </li>
            <li className="location__item">
                <span className="location__label">Population: </span>
                {infoLoc?.residents.length}
            </li>
        </ul>
    </article>
    );
};

export default LocationInfo;
