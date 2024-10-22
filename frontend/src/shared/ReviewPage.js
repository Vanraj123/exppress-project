import React, { useEffect, useState, useContext } from 'react';
import './Review.css'; // Import your CSS file
import { AuthContext } from '../shared/context/auth-context'; // Adjust the path as necessary
import { FaPen } from 'react-icons/fa'; // Review icon

const ReviewPage = () => {
    const { userId } = useContext(AuthContext); // Get the user ID from context
    const [feedback, setFeedback] = useState('');
    const [reviews, setReviews] = useState([]);

    // Fetch reviews from the server on component mount
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/reviews/user/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReviews(data.reviews);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [userId]);

    // Handle the submission of a new review
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback) return;

        try {
            const response = await fetch(`http://localhost:5000/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback, user: userId }),
            });

            const data = await response.json();
            if (response.ok) {
                setReviews([...reviews, { feedback, dateTime: new Date().toISOString() }]);
                setFeedback(''); // Clear input
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="review-page">
            <h1 className="page-title">
                <FaPen /> Add Your Review
            </h1>
            <form className="review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your review here..."
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
            <div className="review-list">
                <h2>Your Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews available. Please add one!</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p className="review-feedback">{review.feedback}</p>
                            <p className="review-date">{new Date(review.dateTime).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewPage;
