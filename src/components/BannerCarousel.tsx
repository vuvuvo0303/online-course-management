import React, { useState } from "react";
import img1 from "../../public/t1.jpg";
import img2 from "../../public/t2.jpg";
import img3 from "../../public/t3.jpg";

const testimonials = [
    {
        img: img1,
    },
    {
        img: img2,
    },
    {
        img: img3,
    }
];

const ClientCarousel: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <div className="testimonial bg-cover bg-center min-h-[200px]">
            <div className="container shadow-lg">
                <div className="relative">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="relative pb-1 text-center w-max">
                                <img alt="" src={testimonial.img} className="img-fluid pl-1 max-w-screen-2xl max-h-[800px]" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between relative">
                    <button onClick={prevSlide} className="absolute left-4 text-2xl bg-white rounded-full p-2 top-[250px]">&#10094;</button>
                    <button onClick={nextSlide} className="absolute text-2xl bg-white rounded-full p-2 left-[1480px] top-[250px]">&#10095;</button>
                </div>
            </div>
        </div>
    );
};

export default ClientCarousel;
