// Rename your CSS file to DisplayReview.module.css
// Then update your component:

import React, { useState, useEffect } from 'react';
import './DisplayReview.css'
import axios from 'axios';
import Review from '../Review/Review';

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
        <div className="display-review-container">
            <div>
                <h1>Review Details display page</h1>
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
    );
}

export default DisplayReview;