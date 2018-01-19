import React from "react";
import ReactStars from "react-stars";
import PropTypes from "prop-types";

const RatingsForm = ({
  showReviewForm,
  displayForm,
  saveReview,
  handleUserInput,
  addReviewBtn,
  getStarValue,
  cancelReview,
  value,
  reviews
}) => {
  // Get total rating
  let totalRating = 0;
  reviews.forEach(review => {
    totalRating += parseFloat(review.rating);
  });
  //  Calculate total ratings
  totalRating = totalRating / reviews.length;

  return (
    <div>
      {/* Div for product review and ratings */}
      <div className="row">
        <div>
          <h3>Product Ratings & Reviews</h3>
        </div>
        <div className="rating-holder">
          <div className="row">
            <img src="/resources/ratings.png"/>
            <h6 className="rating-fig">{reviews.length === 0 ? "0.0" : totalRating.toFixed(1)}</h6>
          </div>
        </div>
        <div className="row reviewBtn">
          {
            !addReviewBtn
              ?
              null
              :
              <button onClick={showReviewForm}>Add Review</button>
          }
          {/* Form */}
          {
            displayForm
              ?
              <div className="row reviewForm">
                <h4>Add New Review</h4>
                <ReactStars
                  count={5}
                  onChange = {getStarValue}
                  size= {24}
                  value={value}
                />
                <form onSubmit={saveReview}>
                  {/* Stars for rating */}
                  <div className="form-group stars">
                    <label>Rate this product</label>
                    <br/>
                  </div>

                  {/* textarea */}
                  <div className="form-group">
                    <label>Review</label>
                    <textarea type="text"
                      cols="10"
                      rows="10"
                      className="form-control"
                      name="reviewText"
                      placeholder="Enter your review"
                      onChange={handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <input type="submit"
                      className="btn btn-success"
                      value="Post Review"
                    />
                    <input
                      type="button"
                      value="cancel"
                      onClick= {cancelReview}
                      className="btn btn-danger"
                    />
                  </div>
                </form>
              </div>
              :
              null
          }
        </div>
        <div className="review-holder">
          <div className="row reviews">
            {
              reviews.length === 0
                ?
                <h5 style={{ color: "red" }}>This product has not been reviewed. Be the first to review this product</h5>
                :
                reviews.map((review, key) => {
                  return <div key={key}>
                    <h4>
                      <i>{review.userName} said: </i>
                    </h4>
                    <p>{review.reviewText}</p>
                    <div className="ratings">
                      <ReactStars
                        count={5}
                        size= {10}
                        value={parseFloat(review.rating)}
                        edit={false}
                      />
                    </div>
                  </div>;
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

RatingsForm.propTypes = {
  addReviewBtn: PropTypes.bool,
  cancelReview: PropTypes.func,
  displayForm: PropTypes.bool,
  getStarValue: PropTypes.func,
  handleUserInput: PropTypes.func,
  reviews: PropTypes.array,
  saveReview: PropTypes.func,
  showReviewForm: PropTypes.func,
  value: PropTypes.number
};

export default RatingsForm;
