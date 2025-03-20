import React from 'react';
import './Review.css';

function Review() {
	return (
		<div>
			<>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Service Review Form</title>
				<link rel="stylesheet" href="../Project/Review.css" />
				<div className="container">
					<h1>Service Review Form</h1>
					<form id="serviceReviewForm">
						<div className="form-group">
							<div className="rating-group">
								<div className="rating-item">
									<div className="rating-title">1. Quality</div>
									<div className="stars" data-rating="quality">
										<span className="star" data-value={1}>
											★
										</span>
										<span className="star" data-value={2}>
											★
										</span>
										<span className="star" data-value={3}>
											★
										</span>
										<span className="star" data-value={4}>
											★
										</span>
										<span className="star" data-value={5}>
											★
										</span>
									</div>
								</div>
								<div className="rating-item">
									<div className="rating-title">2. Price</div>
									<div className="stars" data-rating="price">
										<span className="star" data-value={1}>
											★
										</span>
										<span className="star" data-value={2}>
											★
										</span>
										<span className="star" data-value={3}>
											★
										</span>
										<span className="star" data-value={4}>
											★
										</span>
										<span className="star" data-value={5}>
											★
										</span>
									</div>
								</div>
							</div>
							<div className="rating-group">
								<div className="rating-item">
									<div className="rating-title">3. Value</div>
									<div className="stars" data-rating="value">
										<span className="star" data-value={1}>
											★
										</span>
										<span className="star" data-value={2}>
											★
										</span>
										<span className="star" data-value={3}>
											★
										</span>
										<span className="star" data-value={4}>
											★
										</span>
										<span className="star" data-value={5}>
											★
										</span>
									</div>
								</div>
								<div className="rating-item">
									<div className="rating-title">4. Satisfaction Level</div>
									<div className="stars" data-rating="satisfaction">
										<span className="star" data-value={1}>
											★
										</span>
										<span className="star" data-value={2}>
											★
										</span>
										<span className="star" data-value={3}>
											★
										</span>
										<span className="star" data-value={4}>
											★
										</span>
										<span className="star" data-value={5}>
											★
										</span>
									</div>
								</div>
							</div>
							<div className="recommendation">
								<div className="rating-title">
									5. Would you recommend the service to your friends?
								</div>
								<div className="radio-group">
									<div className="radio-option">
										<input
											type="radio"
											id="recommend-yes"
											name="recommend"
											defaultValue="yes"
										/>
										<label htmlFor="recommend-yes">Of course!</label>
									</div>
									<div className="radio-option">
										<input
											type="radio"
											id="recommend-no"
											name="recommend"
											defaultValue="no"
										/>
										<label htmlFor="recommend-no">Never</label>
									</div>
									<div className="radio-option">
										<input
											type="radio"
											id="recommend-maybe"
											name="recommend"
											defaultValue="maybe"
										/>
										<label htmlFor="recommend-maybe">Maybe</label>
									</div>
								</div>
							</div>
							<div className="thoughts">
								<div className="rating-title">
									6. Let us know your thoughts!
								</div>
								<textarea placeholder="Type here..." defaultValue={''} />
							</div>
							<button type="submit" className="submit-btn">
								Submit
							</button>
						</div>
					</form>
				</div>
			</>
		</div>
	);
}

export default Review;
