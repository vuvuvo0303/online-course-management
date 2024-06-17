import { useState, useEffect } from "react";
import img1 from "../../../../public/t1.jpg";
import img2 from "../../../../public/t2.jpg";
import img3 from "../../../../public/t3.jpg";

const Banner: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const images = [img1, img2, img3];

    // Automatically switch to the next slide every 5 seconds (5000 ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000); // Adjust the duration (in milliseconds) as needed

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full">
            <img src={images[current]} alt="Banner Image" className="w-full" />
        </div>
    );
};

export default Banner;
