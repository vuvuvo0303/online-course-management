import { useParams } from "react-router-dom"
import styles from './courses.module.css'

const CoursesCategory: React.FC = () => {
    const urlParams = useParams().id;

    return (
        <main className={styles.courses_container}>
            <h1 className="main_h1 w-full mt-0 mx-0 mb-20">{urlParams} Courses</h1>
            <div className={styles.component_margin}>
                <div className="mt-0 mx-0 mb-6">
                    <div className="max-w-full">
                        <h2 className="main_h2">Courses to get you started</h2>
                    </div>
                    <p className={styles.category_heading}>
                        Explore courses from experienced, real-world experts.
                    </p>
                </div>
                <div>

                </div>
            </div>

            <div className={styles.component_margin}>
                <div className="mt-0 mx-0 mb-1.6rem">
                    <div className="w-full">
                        <h2 className="main_h2">Featured courses</h2>
                        <p className={styles.category_heading}>
                            Many learners enjoyed this highly rated course for its engaging content.
                        </p>
                    </div>
                </div>
                <section className="relative">
                    <div className={styles.single_course_unit}>
                        <div className=""></div>
                    </div>
                </section>
            </div>
        </main>

    )
}

export default CoursesCategory