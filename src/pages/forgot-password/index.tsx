import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance.ts';
import styles from './forgot.module.css';
import { API_FORGOT_PASSWORD, paths } from '../../consts';
import ResponseData from 'models/ResponseData.ts';
import { message } from 'antd';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response: ResponseData = await axiosInstance.put(API_FORGOT_PASSWORD, { email });
            if (response.success) {
                message.success("New password sent to your email. Please check your inbox.");
            }
        } catch (error) {
            //
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full'>
            <main className={styles.forgot_container}>
                <div className='flex flex-col md:flex-row'>
                    <div className='w-full md:w-1/2'>
                        <picture>
                            <img className='mx-auto md:ml-10 w-72 md:w-96' src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x2.webp" alt="" />
                        </picture>
                    </div>

                    <div className='w-full md:w-1/2'>
                        <div className='mt-10 md:mr-32'>
                            <h1 className='main_h1 text-center mb-5'>Forgot Password</h1>
                            <h4 className='font-thin text-center'>We’ll email you a link so you can reset your password.</h4>
                            <form onSubmit={handleSubmit}>
                                <div className='py-7 px-8 md:px-16 min-w-72 max-w-full md:max-w-[60rem]'>
                                    <div className={styles.form_control}>
                                        <input
                                            className={styles.input_field}
                                            type="email"
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            minLength={7}
                                            maxLength={64}
                                            required
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div className='mb-10'>
                                        <button type='submit' className={styles.button} disabled={loading}>
                                            <span>{loading ? 'Sending...' : 'Reset Password'}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.other_options}>
                                    <span>or <Link className={styles.link_underline} to={paths.LOGIN}>Log in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ForgotPassword;
