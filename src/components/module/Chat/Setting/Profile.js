import React, { useState, useRef } from 'react'
import UserProfile from "../../../../assets/images/UserProfile.png"
import Union from "../../../../assets/images/Union.png"
import PrivacySecurity from "../../../../assets/images/security.png"
import dataStorage from "../../../../assets/images/dataStorage.png"
import Chat from "../../../../assets/images/Chat.png"
import Device from "../../../../assets/images/Device.png"



import './settingchat.css'
import Button from '../../../base/Button'

function SettingChat(props) {
   
    const [disabled, setDisabled] = useState(true);
    const [disabledFullName, setDisabledFullName] = useState(true);
    const [disabledUsername, setDisabledUsername] = useState(true);
    const [disabledBio, setDisabledBio] = useState(true);
    const [show, setShow] = useState(false);

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

   
    const hiddenFileInput = useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };




    return (
        <div className="setting-profile">
            <div className="header-setting d-flex">
                <i className="fa fa-angle-left" onClick={props.back} />
                <h1>@Levi  </h1>
            </div>
            <div className="pict-user">
                    <img
                        className="picture-user"
                        src={UserProfile}
                        alt="pict profil"
                    />
              
                <Button
                    title="Choose photo"
                    btn="btn-choose-photo"
                    onClick={handleClick}
                />
                {/* <input
                    type="file"
                    name="image"
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                /> */}
            </div>
            <div className="info-username">
                <h3>Levi Ackerman</h3>
                <p>@Levi</p>
  
            </div>
            {show === true ?
                <Button title="save" btn="save-data" 
    
                />
                :
                ""
            }
            <div className="container">
                <div className="account-profile">
                    <h1>Account</h1>
                    <div className="phoneNumber-input">
                        <input type="text" name="phoneNumber"
                
                            disabled={disabled} 
                            />
                        {disabled === true ? "" : <i className="fa fa-check " 
              
                        />}
                        <p onClick={handleDisabledFalse}>Tap to change phone number</p>
                    </div>
                    <hr />
                    <div className="fullName-input">
                        <input type="text" name="fullName" 
                
                        disabled={disabledFullName} 
                        />
                        <br />
                        <span>fullname</span>
                        {disabledFullName === true ? <i className="fa fa-pen" onClick={handleDisabledFullName} /> : <i className="fa fa-check " 
           
                        />}
                    </div>
                    <hr />
                    <div className="username-input">
                        <input type="text" name="username" 
                
                        disabled={disabledUsername} 
                        />
                        <br />
                        <span>username</span>
                        {disabledUsername === true ? <i className="fa fa-pen" onClick={handleDisabledUsername} /> : <i className="fa fa-check " 
            
                        />}
                    </div>
                    <hr />
                    <div className="bio-input">
                        <textarea type="text" name="bio" 
                    
                        disabled={disabledBio} 
                        />
                        <br />
                        <span>bio</span>
                        {disabledBio === true ? <i className="fa fa-pen" onClick={handleDisabledBio} /> : <i className="fa fa-check " 
            
                        />}
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
