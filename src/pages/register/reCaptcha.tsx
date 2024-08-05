import ReCAPTCHA from "react-google-recaptcha";
import config from "../../secret/config";

const Recaptcha: React.FC<{ onVerify: (token: string | null) => void }> = ({ onVerify }) => {
  const handleVerify = (token: string | null) => {
    onVerify(token);
  };

  return <ReCAPTCHA sitekey={config.RECAPTCHA_KEY} onChange={handleVerify} />;
};

export default Recaptcha;