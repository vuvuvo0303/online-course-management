import Categories from "../../components/Categories";
import TeacherCategories from "../../components/TeacherCategories";
import BannerCarousel from "../../components/BannerCarousel";

const Home = () => {
    return (
        <div>
            <BannerCarousel />
            <h2 className='flex-1 flexStart gap-10' style={{ marginLeft: '50px', fontSize: '20px', marginTop: '700px' }}>Learners are viewing</h2>
            <section className='flexStart paddings mb-16'>
                <Categories />
            </section>
            <h2 className='flex-1 flexStart gap-10' style={{ marginLeft: '50px', fontSize: '20px' }}>Outstanding lecturers</h2>
            <section className='flexStart paddings mb-16'>
                <TeacherCategories />
            </section>
        </div>
    );
};

export default Home;
