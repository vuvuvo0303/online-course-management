import Categories from "../../components/categories/main";
import TeacherCategories from "../../components/categories/teacher";
import Banner from "../../components/categories/banner";
import LogoCategories from "../../components/categories/logo";
import NewSection from "../../components/news/NewSection";
import List from "../../components/categories/list";

const Home: React.FC = () => {
    return (
        <div>
            <Banner />
            <LogoCategories />
            <h2 className='flex-1 flexStart gap-10 ml-[50px] text-[25px] mt-[50px] font-bold'>Extensive course collection</h2>
            <h3 className='flex-1 flexStart gap-10 ml-[50px] text-[15px] mt-[5px]'>
                Choose from over 220,000 online video courses with new additional content published monthly
            </h3>
            <section className='flexStart paddings mb-16'>
                <Categories />
            </section>
            <span className='flex-1 flexStart gap-10 ml-[50px] text-[20px] mb-[1px]'></span>
            <section className='flexStart paddings mb-16'>
                <TeacherCategories />
            </section>
            <NewSection />
            <section className='mb-[5rem] mt-[2rem]'>
                <List />
            </section>
        </div>
    );
};

export default Home;