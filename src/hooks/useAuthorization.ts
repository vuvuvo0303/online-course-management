import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuthorization = (): void => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (!storedRole) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuthorization;
