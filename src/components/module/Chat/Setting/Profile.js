import React, { useState, useEffect, useRef } from 'react'
import UserImage from "../../../../assets/images/UserProfile.png"
import Union from "../../../../assets/images/Union.png"
import PrivacySecurity from "../../../../assets/images/security.png"
import dataStorage from "../../../../assets/images/dataStorage.png"
import Chat from "../../../../assets/images/Chat.png"
import Device from "../../../../assets/images/Device.png"

import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { userProfile, update, getUser } from "../../../../configs/redux/action/user"


import './settingchat.css'
import Button from '../../../base/Button'

function SettingChat(props) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [disabled, setDisabled] = useState(true);
    const [disabledFullName, setDisabledFullName] = useState(true);
    const [disabledUsername, setDisabledUsername] = useState(true);
    const [disabledBio, setDisabledBio] = useState(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        username: "",
        name: "",
        phone: "",
        bio: "",
    });
    const [dataImage, setDataImage] = useState({
        image: {},
    });

    const handleDisabledFalse = () => {
        setDisabled(!disabled);
    };
    const handleDisabledFullName = () => {
        setDisabledFullName(!disabledFullName);
    };
    const handleDisabledUsername = () => {
        setDisabledUsername(!disabledUsername);
    };
    const handleDisabledBio = () => {
        setDisabledBio(!disabledBio);
    };
    const handleFormChange = (event) => {
        const userNew = { ...data };
        userNew[event.target.name] = event.target.value;
        setData(userNew);
    };

    const handleChangeImage = (event) => {
        setDataImage({
            image: event.target.files[0],
        });
        setShow(true)
    };


    const hiddenFileInput = useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const handleSaveImage = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("bio", data.bio);
        formData.append("image", dataImage.image);
        dispatch(update(formData))
            .then((res) => {
                setDisabled(true)
                setShow(false)
                setDisabledFullName(true)
                setDisabledUsername(true)
                setDisabledBio(true)
                Swal.fire({
                    title: "Success!",
                    text: res,
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#ffba33",
                }).then(() => {
                    dispatch(userProfile()).then((res) => {
                        dispatch(getUser());
                    });
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#6a4029",
                });
            });
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(userProfile()).then((res) => {
            setData(res);
        });
    }, [dispatch]);



    return (
        <div className="setting-profile">
            <div className="header-setting d-flex">
                <i className="fa fa-angle-left" onClick={props.back} />
                <h1>{user.username === null | user.username === undefined ? "-" : `@${user.username}`}</h1>
            </div>
            <div className="pict-user">
                {user.image === undefined ? (
                    ""
                ) : (
                    <img
                        className="picture-user"
                        src={user.image? user.image : UserImage}
                        alt="pict profil"
                    />
                )}
                <Button
                    title="Choose photo"
                    btn="btn-choose-photo"
                    onClick={handleClick}
                />
                <input
                    type="file"
                    name="image"
                    ref={hiddenFileInput}
                    onChange={(event) => handleChangeImage(event)}
                    style={{ display: "none" }}
                />
            </div>
            <div className="info-username">
                <h3>{user.name === null ? "Full Name" : user.name}</h3>
                <p>{user.username === null ? "username" : `@${user.username}`}</p>

            </div>
            {show === true ?
                <Button title="save" btn="save-data" onClick={handleSaveImage}
                />
                :
                ""
            }
            <div className="container">
                <div className="account-profile">
                    <h1>Account</h1>
                    <div className="phoneNumber-input">
                        <input type="text" name="phone"
                            value={data.phone === null ? "Input your number" : data.phone} onChange={handleFormChange}
                            disabled={disabled}
                        />
                        {disabled === true ? "" : <i className="fa fa-check " onClick={handleSaveImage}
                        />}
                        <p onClick={handleDisabledFalse}>Tap to change phone number</p>
                    </div>
                    <hr />
                    <div className="fullName-input">
                        <input type="text" name="name"
                            value={data.name === null ? "Change your name" : data.name} onChange={handleFormChange} disabled={disabledFullName}
                        />
                        <br />
                        <span>fullname</span>
                        {disabledFullName === true ? <i className="fa fa-pen" onClick={handleDisabledFullName} /> : <i className="fa fa-check " onClick={handleSaveImage} 
                        />}
                    </div>
                    <hr />
                    <div className="username-input">
                        <input type="text" name="username" value={data.username === null ? "Input your username" : data.username} onChange={handleFormChange} disabled={disabledUsername}
                        />
                        <br />
                        <span>username</span>
                        {disabledUsername === true ? <i className="fa fa-pen" onClick={handleDisabledUsername} /> : <i className="fa fa-check " onClick={handleSaveImage}  />}
                    </div>
                    <hr />
                    <div className="bio-input">
                    <textarea type="text" name="bio" value={data.bio === null ? "Change your bio" : data.bio} onChange={handleFormChange} disabled={disabledBio} />
                        <br />
                        <span>bio</span>
                        {disabledBio === true ? <i className="fa fa-pen" onClick={handleDisabledBio} /> : <i className="fa fa-check " onClick={handleSaveImage} />}
                    </div>

                    <h1>Settings</h1>
                    <div className="setting">
                        <div className="d-flex mt-3">
                            <img alt="bell pict" src={Union} width="22" height="20" />
                            <p>Notification and Sounds</p>
                        </div>
                        <div className="d-flex mt-3 privacy">
                            <img alt="Privacy and security" src={PrivacySecurity} width="16" height="20" />
                            <p>Privacy and Security</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="dataStorage pict" src={dataStorage} width="22" height="20" />
                            <p>Data and Storage</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="Chat settings pict" src={Chat} width="22" height="20" />
                            <p>Chat settings</p>
                        </div>
                        <div className="d-flex mt-3">
                            <img alt="Devices pict" src={Device} width="22" height="17" />
                            <p>Devices</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingChat
