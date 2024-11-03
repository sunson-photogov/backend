// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the CSS styles

function App() {
    const [image, setImage] = useState(null);
    const [visaType, setVisaType] = useState("DV Lottery");
    const [processedImage, setProcessedImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleVisaTypeChange = (e) => {
        setVisaType(e.target.value);
    };

    const handleSubmit = async () => {
        if (!image) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("visaType", visaType);

        try {
            const response = await axios.post("http://localhost:5000/process-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProcessedImage(response.data.processedImage);
        } catch (error) {
            console.error("Error processing image:", error);
            alert("There was an error processing the image.");
        }
    };

    return (
        <div className="container">
            <h1 className="header">Visa Photo Editor</h1>
            <input type="file" onChange={handleImageChange} />
            <select value={visaType} onChange={handleVisaTypeChange} className="select">
                <option value="DV Lottery">DV Lottery</option>
                <option value="Canada Visa">Canada Visa</option>
                <option value="Schengen Visa">Schengen Visa</option>
                {/* Add more visa types as needed */}
            </select>
            <button onClick={handleSubmit} className="button">Process Photo</button>
            {processedImage && (
                <div>
                    <h2 className="subheader">Processed Image</h2>
                    <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" className="image" />
                    <a href={`data:image/jpeg;base64,${processedImage}`} download="processed_image.jpg" className="download">
                        Download Image
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
