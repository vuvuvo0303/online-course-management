import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Footer, Navbar } from './components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './secret/config';

function App() {
  const location = useLocation();

  const isPrivatePath = location.pathname.includes('/admin') || location.pathname.includes('/instructor');

  const clientId = config.GOOGLE_CLIENT_ID;
  console.log("check id: ", clientId)
  if (!clientId) {
    throw new Error('Google OAuth Client ID is not defined');
  }
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        {!isPrivatePath && <Navbar />}
        <AppRouter />
        {!isPrivatePath && <Footer />}
      </GoogleOAuthProvider>
    </>
  );
}
export default App;