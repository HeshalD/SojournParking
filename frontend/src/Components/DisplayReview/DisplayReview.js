// Rename your CSS file to DisplayReview.module.css
// Then update your component:

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DisplayReview.css'
import axios from 'axios';
import Review from '../Review/Review';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const URL = 'http://localhost:5000/Review';

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function DisplayReview() {
    const [review, setReview] = useState();

    useEffect(() => {
        fetchHandler().then((data) => {
            console.log('API Response:', data);
            setReview(data.review);
        });
    }, []);

    return (
        <>
        <Header/>
        <div className="display-review-container">
            <div>
                <div className="review-header">
                    <h1>Review Details display page</h1>
                    <Link to="/addReview" className="add-review-btn">
                        Add Review
                    </Link>
                </div>
                <div>
                    {review &&
                        review.map((review, i) => (
                            <div key={i}>
                                <Review review={review} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default DisplayReview;