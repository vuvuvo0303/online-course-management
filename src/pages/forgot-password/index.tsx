import { Link } from 'react-router-dom'
import styles from './forgot.module.css'
import { paths } from '../../consts'

const ForgotPassword = () => {
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
                            <form action="">
                                <div className='py-7 px-8 md:px-16 min-w-72 max-w-full md:max-w-[60rem]'>
                                    <div className={styles.form_control}>
                                        <input className={styles.input_field} type="email" name='email' minLength={7} maxLength={64} required placeholder='Email' />
                                    </div>
                                    <div className='mb-10'>
                                        <button type='submit' className={styles.button}>
                                            <span>Reset Password</span>
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
    )
}

export default ForgotPassword
