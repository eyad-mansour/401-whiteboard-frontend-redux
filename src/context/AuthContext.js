import { createContext, useState } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import cookies from 'react-cookies';

export const authContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState('');
  const [capabilities, setCapabilities] = useState();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      userName: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/signup`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.email.value,
      password: e.target.password.value,
    };
    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    console.log(encodedCredintial);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND}/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredintial}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        cookies.remove();
        cookies.save('token', res.data.token);
        cookies.save('userID', res.data.id);
        cookies.save('userName', res.data.userName);
        cookies.save('role', res.data.role);
        cookies.save('capabilities', JSON.stringify(res.data.capabilities));
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    cookies.remove('token');
    setIsAuth(false);
  };
  const checkToken = () => {
    const token = cookies.load('token');
    const role = cookies.load('role');
    if (token) {
      setIsAuth(true);
      setRole(role);
      setCapabilities(cookies.load('capabilities'));
    }
  };

  const userAbility = (capabilities, userID) => {
    if (
      capabilities.includes('delete') ||
      parseInt(cookies.load('userID')) === userID
    ) {
      return true;
    } else {
      return false;
    }
  };

  const value = {
    isAuth,
    logOut,
    setIsAuth,
    handleSignIn,
    handleSignUp,
    checkToken,
    role,
    capabilities,
    userAbility,
  };

  return (
    <authContext.Provider value={value}>
      <>{props.children}</>
    </authContext.Provider>
  );
};

export default AuthContextProvider;
