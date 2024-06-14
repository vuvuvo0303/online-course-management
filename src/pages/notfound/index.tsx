import { paths } from '../../consts'
import styles from './notfound.module.css'
const NotFound: React.FC = () => {
  return (
    <div className="flex-1">
      <div className={styles.container}>
        <img className='my-0 mx-auto' src="https://s.udemycdn.com/error_page/error-desktop-2x-v1.jpg" alt="error img" width={480} height={360} />
        <h1 className={styles.error_greeting}>
          We can’t find the page you’re looking for
        </h1>
        <p className={styles.error_text}> Visit our <a href={paths.SUPPORT} className={styles.support_link}>support page</a> for further assistance.
        </p>
      </div>
    </div>
  )
}

export default NotFound