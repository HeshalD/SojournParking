import React from 'react'
import './ChooseParking.css'

function ChooseParking() {
    return (
        <div>
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <div className="parking-container">
                    <h2>CHOOSE A PARKING SLOT</h2>
                    <div className="icon">
                        <img src="/Icons/door.png" alt="Building" />
                        <p>Building Entrance</p>
                    </div>
                    <div className="parking-layout">
                        {/* First Row: Labeled Slots */}
                        <div className="row">
                            <div className="icon entrance">
                                <img src="/Icons/gate.png" alt="Entrance" />
                                <p>Entrance</p>
                            </div>
                            <div className="slot" onclick="openForm('A1')">
                                A1
                            </div>
                            <div className="slot" onclick="openForm('A2')">
                                A2
                            </div>
                            <div className="slot" onclick="openForm('A3')">
                                A3
                            </div>
                            <div className="slot" onclick="openForm('A4')">
                                A4
                            </div>
                            <div className="slot" onclick="openForm('A5')">
                                A5
                            </div>
                            <div className="slot" onclick="openForm('A6')">
                                A6
                            </div>
                            <div className="slot" onclick="openForm('A7')">
                                A7
                            </div>
                            <div className="slot" onclick="openForm('A8')">
                                A8
                            </div>
                            <div className="slot" onclick="openForm('A9')">
                                A9
                            </div>
                        </div>
                        {/* Second Row: Empty Slots with Arrows */}
                        <div className="row arrows">
                            <span>➡</span>
                            <span>➡</span>
                            <span>➡</span>
                        </div>
                        <div className="row">
                            <div className="slot" onclick="openForm('B1')">
                                B1
                            </div>
                            <div className="slot" onclick="openForm('B2')">
                                B2
                            </div>
                            <div className="slot" onclick="openForm('B3')">
                                B3
                            </div>
                            <div className="slot" onclick="openForm('B4')">
                                B4
                            </div>
                            <div className="slot" onclick="openForm('B5')">
                                B5
                            </div>
                            <div className="slot" onclick="openForm('B6')">
                                B6
                            </div>
                            <div className="slot" onclick="openForm('B7')">
                                B7
                            </div>
                            <div className="slot" onclick="openForm('B8')">
                                B8
                            </div>
                            <div className="slot" onclick="openForm('B9')">
                                B9
                            </div>
                        </div>
                        {/* Third Row: Empty Slots with Arrows */}
                        <div className="row arrows">
                            <span>⬅</span>
                            <span>⬅</span>
                            <span>⬅</span>
                        </div>
                        <div className="row">
                            <div className="row">
                                <div className="icon exit">
                                    <img src="/Icons/gate.png" alt="Exit" />
                                    <p>Exit</p>
                                </div>
                            </div>
                            <div className="slot" onclick="openForm('C1')">
                                C1
                            </div>
                            <div className="slot" onclick="openForm('C2')">
                                C2
                            </div>
                            <div className="slot" onclick="openForm('C3')">
                                C3
                            </div>
                            <div className="slot" onclick="openForm('C4')">
                                C4
                            </div>
                            <div className="slot" onclick="openForm('C5')">
                                C5
                            </div>
                            <div className="slot" onclick="openForm('C6')">
                                C6
                            </div>
                            <div className="slot" onclick="openForm('C7')">
                                C7
                            </div>
                            <div className="slot" onclick="openForm('C8')">
                                C8
                            </div>
                            <div className="slot" onclick="openForm('C9')">
                                C9
                            </div>
                        </div>
                        <div id="parkingForm" className="form-container">
                            <div className="form-box">
                                <span className="close-btn" onclick="closeForm()">
                                    X
                                </span>
                                <h3>Reserve Parking Slot</h3>
                                <p id="selected-slot">Slot: </p>
                                <input type="text" id="name" placeholder="Your Name" required="" />
                                <input
                                    type="text"
                                    id="licensePlate"
                                    placeholder="License Plate Number"
                                    required=""
                                />
                                <input type="time" id="entryTime" required="" />
                                <button onclick="submitForm()">Reserve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    )
}

export default ChooseParking
