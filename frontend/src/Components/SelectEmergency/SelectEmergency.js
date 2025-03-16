import React from 'react'
import './SelectEmergency.css'

function SelectEmergency() {
    return (
        <div>
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Emergency Assistance</title>
                <link rel="stylesheet" href="homepage.css" />
                <img src="/new21.png" alt="" className="img1" />
                <div className="container">
                    <div className="header">EMERGENCY ASSISTANCE</div>
                    <div className="container1">
                        <button className="btn"> Medical Emergency</button>
                        <button className="btn"> Mechanical Issue</button>
                        <button className="btn"> Security Concern</button>
                    </div>
                    <button className="btn1">Live Agent Support</button>
                </div>
            </>

        </div>
    )
}

export default SelectEmergency
