import React, { useState } from "react";
import img1 from "../../public/t1.jpg";
import img2 from "../../public/t2.jpg";
import img3 from "../../public/t3.jpg";

const testimonials = [
    {
        img: img1,
        name: "Janet Wilson",
        title: "Web Developer",
        text: "Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing."
    },
    {
        img: img2,
        name: "Janet Wilson",
        title: "Web Designer",
        text: "Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing."
    },
    {
        img: img3,
        name: "Janet Wilson",
        title: "Web Developer",
        text: "Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing."
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
        <div className="testimonial p-2 bg-cover bg-center min-h-[200px]" style={{ backgroundImage: `url(../../images/testimonial.jpg)` }}>
            <div className="container mx-auto p-2">
                <div className="relative">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="relative mb-4 mt-4 mx-auto text-center" style={{ width: '100%' }}>
                                <img alt="" src={testimonial.img} className="img-fluid mb-3 mx-auto w-full h-auto" />
                                <h5 className="text-dark">{testimonial.name}</h5>
                                <span className="text-secondary">{testimonial.title}</span>
                                <p className="text-dark mt-3">{testimonial.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8 relative">
                    <button onClick={prevSlide} className="absolute left-4 text-2xl bg-white rounded-full p-2">&#10094;</button>
                    <button onClick={nextSlide} className="absolute right-4 text-2xl bg-white rounded-full p-2">&#10095;</button>
                </div>
            </div>
        </div>
    );
};

export default ClientCarousel;
