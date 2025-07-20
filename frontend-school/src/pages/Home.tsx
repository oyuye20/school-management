import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginContext';

export const Home = () => {
    const provider = useContext(LoginContext);


  return (
    <div>Welcome {provider}</div>
  )
}
