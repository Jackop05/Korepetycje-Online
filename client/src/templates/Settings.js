import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {

    return (
        <div className="settings-page">
            <div className="settings-navbar">
                <Link to="/main"><img className="home-image" src="../images/home.png" alt="home mage" /></Link>
                <div className="username">Jakub Sztobryn</div>
            </div>
            <div className="settings-main">
                <div className="settings-title">Settings</div>
                <div className="settings-options">
                    <div className="setting-option setting-option-1">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-2">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-3">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-4">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-5">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-6">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-7">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-8">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-9">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                    <div className="setting-option setting-option-10">
                        <div className="setting-option-name">Dark mode</div>
                        <div className="turn-on-image" src="#" alt="turn on/off button" />
                        <div className="turn-on-button" src="#" alt="turn on/off button" />
                    </div>
                </div>
            </div>
        </div>
    )
}