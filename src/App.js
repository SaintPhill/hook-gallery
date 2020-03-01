import React, { useEffect, useState } from "react";
import { fetchApi } from "./api/apiJSON";

import { Header } from "./Components/Header/Header";
import { Gallery } from "./Components/Gallery/Gallery";
import { AboutUs } from "./Components/AboutUs/AboutUsTemplate";
import { ContactUs } from "./Components/ContactForm/ContactUs";
import { Footer } from "./Components/Footer/Footer";
import "./App.css";

function App() {
    const [ galleryImages, setGalleryImages ] = useState(null);
    const [ aboutUsInfo, setInfo] = useState(null);
    const [ formData, setFormData] = useState(null);
    const [ isShowContent, showContent ] = useState(false);

    useEffect(() => {
        fetchApi()
            .then(response => {
                response.data.components.forEach(component =>
                    component.type === "GalleryComponent"
                        ? setGalleryImages(component.metadata)
                        : setInfo(component.metadata.components));
                setFormData(response.data.form);
                showContent(true)
            })
            .catch(error => console.log("Error", error.message))
    }, [isShowContent]);

    return (
        <div className="page">
            <Header />
            {isShowContent
                ? (
                    <div className="page__content">
                        <Gallery title={galleryImages.title} images={galleryImages.images} />
                        <AboutUs info={aboutUsInfo} />
                        <ContactUs data={formData} />
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            <Footer />
        </div>
    );
}

export default App;
