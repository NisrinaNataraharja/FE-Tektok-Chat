import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Chat from '../../pages/Home/ChatMain'
import Profile from '../../pages/profile';
import io from 'socket.io-client'
import Auth from '../../components/base/Auth';

function App() {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!socket && token) {
            const resultSocket = io(process.env.REACT_APP_TEKTOK_API_BE, {
                query:{
                    token: token
                }
            })
            setSocket(resultSocket)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setSocket={setSocket} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Auth> <Chat socket={socket} /> </Auth>} />
                <Route path="/profile" element={<Auth><Profile /></Auth>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;