import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Chat from '../../pages/Home/ChatMain'
import Profile from '../../pages/profile';
import io from 'socket.io-client'

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
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setSocket={setSocket} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Chat socket={socket} />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;