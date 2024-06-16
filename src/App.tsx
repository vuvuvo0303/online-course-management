import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Footer, Navbar } from './components';

function App() {
  const location = useLocation();

  const isPrivatePath = location.pathname.includes('/admin') || location.pathname.includes('/instructor');

  return (
    <>
      {!isPrivatePath && <Navbar />}
      <AppRouter />
      {!isPrivatePath && <Footer />}
    </>
  );
}

export default App;
