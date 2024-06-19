import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const LayoutWithLogin = ({ children }) => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    let nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  };
  useEffect(() => {
    const userName = getCookie('userName');
    const id = getCookie('id');
    if (!userName || !id) {
      navigate('/signin');
    }
  }, []);
  return <>{children}</>;
};

export default LayoutWithLogin;
