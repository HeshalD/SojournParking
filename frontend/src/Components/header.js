import React from 'react'

function header() {
    return (
        <div>
            <>
                <link rel="stylesheet" href="./header.css" />
                <header className="header">
                    <div className="logo">
                        <img src="./Logo FINAL White.png" alt="Logo" width={50} />
                    </div>
                    <nav className="nav-links">
                        <a href="#">Reservations</a>
                        <a href="#">Emergency Services</a>
                        <a href="#">Discounts &amp; Promos</a>
                        <a href="#">Customer Care</a>
                    </nav>
                    <div className="profile-icon">
                        <a href="#">
                            <img
                                src="./user-regular.svg"
                                alt="user"
                                width={25}
                                className="usericon"
                            />
                        </a>
                    </div>
                </header>
            </>

        </div>
    )
}

export default header
