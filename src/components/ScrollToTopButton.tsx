import { CaretUpOutlined } from '@ant-design/icons';

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <CaretUpOutlined
            onClick={scrollToTop}
            className='fixed right-10 bottom-10 bg-black-100 text-white rounded-full p-6'
        />
    );
};

export default ScrollToTopButton;
