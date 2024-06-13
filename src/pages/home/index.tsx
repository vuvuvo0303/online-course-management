import Categories from "../../components/categories/main/Categories";
import TeacherCategories from "../../components/categories/teacher/TeacherCategories";
import ClientCarousel from "../../components/ClientCarousel";
import LogoCategories from "../../components/categories/logo/LogoCategories";
import NewSection from "../../components/news/NewSection";

const Home: React.FC = () => {
    return (
        <div>
            <ClientCarousel />
            <LogoCategories />
            <h2 className='flex-1 flexStart gap-10 ml-[50px] text-[25px] mt-[50px] font-bold'>Extensive course collection</h2>
            <h3 className='flex-1 flexStart gap-10 ml-[50px] text-[15px] mt-[5px]'>
                Choose from over 220,000 online video courses with new additional content published monthly
            </h3>
            <section className='flexStart paddings mb-16'>
                <Categories />
            </section>
            <h2 className='flex-1 flexStart gap-10 ml-[50px] text-[20px] mb-[1px]'>Outstanding lecturers</h2>
            <section className='flexStart paddings mb-16'>
                <TeacherCategories />
            </section>
            <NewSection />
        </div>
    );
};

export default Home;