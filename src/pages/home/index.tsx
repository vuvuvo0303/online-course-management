import Categories from "../../components/categories/main";
import TeacherCategories from "../../components/categories/teacher";
import Banner from "../../components/categories/banner";
import LogoCategories from "../../components/categories/logo";
import NewSection from "../../components/categories/news/NewSection";
import List from "../../components/categories/list";
import AllCourses from "../../components/categories/all-course/index";

const Home: React.FC = () => {
    return (
        <div>
            <Banner />
            <LogoCategories />
            <h2 className='flex-1 flex-start gap-10 ml-5 md:ml-10 text-2xl mt-5 md:mt-10 font-bold'>
                Extensive course collection
            </h2>
            <h3 className='flex-1 flex-start gap-10 ml-5 md:ml-10 text-sm mt-1 md:mt-2'>
                Choose from over 220,000 online video courses with new additional content published monthly
            </h3>
            <section className='flex-start md:p-5'>
                <Categories />
            </section>
            <section className='flex-start md:p-5'>
                <AllCourses />
            </section>
            <section className='flex-start md:p-5'>
                <TeacherCategories />
            </section>
            <NewSection />
            <section className='mb-10 md:mb-20 mt-5 md:mt-10'>
                <List />
            </section>
        </div>
    );
};

export default Home;
