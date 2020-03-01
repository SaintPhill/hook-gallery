import * as React from "react";
import Parser from 'html-react-parser';

import './AboutUsTemplate.css'

export const AboutUs = ({info}) => {
    return (
        <div className="about-us">
            {info.map((component, index) => (
                <div key={index} className="about-us__info">
                    <h2 className="about-us__title">
                        {component.metadata.title}
                    </h2>
                    {Parser(component.metadata.text)}
                </div>)
            )}
        </div>
    )
};
