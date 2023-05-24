import React, { createContext, useEffect, useState } from 'react';
import { DEV_API_URL } from '../utils/api_url';
import axios from 'axios';

export const ContextPage = createContext();

export default function ContextProvider(props) {

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();

    const [users, setUsers] = useState([]);


    const LoadUsers = async () => {
        try {
        let res = await fetch(`/api/users`);
        let data = await res.json();
        setUsers(data);
        } catch(error){
            console.log({error});
        }
    }

    const addUser = async(user) => {
        try {
        let res = await fetch(`/api/users/add`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
      }
    }
    

    const value = {
        email, setEmail,
        phone, setPhone,
        userName, setUserName,
        password, setPassword,
        confirm, setConfirm,
        addUser, LoadUsers, users
    }

  return (
    <ContextPage.Provider value={value}>
        {props.children}
    </ContextPage.Provider>
  )
}
