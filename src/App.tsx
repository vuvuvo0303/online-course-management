import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Footer, Navbar } from './components';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const location = useLocation();

  const isPrivatePath = location.pathname.includes('/admin') || location.pathname.includes('/instructor');

  const clientId = "157087721745-t0g92nva43pt9jsrm49nrarpujlk314t.apps.googleusercontent.com";

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
