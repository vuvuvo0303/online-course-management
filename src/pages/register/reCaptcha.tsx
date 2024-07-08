// ReCaptcha.tsx
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha: React.FC<{ onVerify: (token: string | null) => void }> = ({ onVerify }) => {
    const handleVerify = (token: string | null) => {
        onVerify(token);
    };

    return (
        <ReCAPTCHA
            sitekey="6LcrkgkqAAAAANcrH9wjWrfV9TMzigiNB32SNBiV"
            onChange={handleVerify}
        />
    );
};

export default Recaptcha;
