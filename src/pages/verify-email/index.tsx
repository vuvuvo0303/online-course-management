import CustomButton from "../../components/CustomButton.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../services/api.ts";
import {toast} from "react-toastify";
import {paths} from "../../consts";

const VerifyEmail: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const handleVerifyEmail = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/verify-email", {
                token: params.token,
            });
            console.log(response);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if(response.success){
                toast.success("Verification Successfully");
                navigate(paths.LOGIN);
            }
        }
        catch(error){
            //
        }

    }
    return(
        <div className="flex items-center justify-center flex-col">
            <h1 className="main_h1 my-5">Verify Token</h1>
            <div className="mb-5">
                <CustomButton title="Verify Email" width="100" containerStyles="bg-red-500" handleClick={handleVerifyEmail} />
            </div>
        </div>
    )
}

export default VerifyEmail;