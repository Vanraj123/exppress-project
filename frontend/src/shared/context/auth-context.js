import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userid: null,
  roleid:null,
  role: null,
  username: "UserName",
  login: () => {},
  logout: () => {}
});
