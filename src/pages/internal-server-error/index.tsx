import {Link} from "react-router-dom";
import {paths} from "../../consts";
import CustomButton from "../../components/CustomButton.tsx";
import './internal.css';

const InternalServerError: React.FC = () => {
    return(
        <div className="text-center">
            <h2 className="title text-center text-red-500 font-medium md:pt-10 px-3.5 pt-10">We are working on it try After some time!!!</h2>
            <img className="block mx-auto md:h-[33rem] h-72"
                 src="https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-1905.jpg?w=740&t=st%3D1682764664%7Eexp%3D1682765264%7Ehmac%3Df334091146fd17dabefd920fdbc289bc13c487dfdf72229ccd14338eb5a14f5f"
                 alt="internal-server-error-pic"/>
            <div className="flex justify-center items-center pb-5">
                <Link to={paths.HOME}>
                    <CustomButton containerStyles="bg-red-500" title="Back to Home Page"></CustomButton>
                </Link>
            </div>
        </div>
    )
}

export default InternalServerError;

