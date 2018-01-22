/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from "react";
import { setTimeout } from "timers";
import { Meteor } from "meteor/meteor";
import RatingsForm from "./ratingsForm";
import { Reaction } from "/client/api";

/**
 *
 * @class Ratings
 * @classdesc product ratings and reviews
 * @extends {Component}
 */
class Ratings extends Component {
  constructor(props) {
    super(props);

    this.productInfo = { ...this.props };
    // define state for component
    this.state = {
      displayForm: false,
      addReviewBtn: true,
      reviewText: "",
      ratingValue: 0,
      reviews: []
    };

    // Bind button to this class
    this.showReviewForm = this.showReviewForm.bind(this);
    this.saveReview = this.saveReview.bind(this);
    this.cancelReview = this.cancelReview.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.getStarValue = this.getStarValue.bind(this);
  }

  /**
   *
   * @returns { object } updated state
   * @memberof Ratings
   */
  componentDidMount() {
    if (Reaction.hasPermission("admin") || Meteor.user().emails.length === 0) {
      this.setState({ displayForm: false, addReviewBtn: false });
    } else if (Meteor.user().emails.length > 0) {
      this.setState({ displayForm: false, addReviewBtn: true });
    }

    Meteor.call("fetchRatings", this.productInfo.product._id, (error, response) => {
      if (error) {
        return error;
      }
      this.setState({ reviews: response });
    });
  }

  /**
   *
   * @returns updated state
   * @memberof Ratings
   */
  showReviewForm() {
    this.setState({ displayForm: true, addReviewBtn: false });
  }

  /**
   * @param { object } event event on target element event
   * @memberof Ratings
   */
  saveReview(event) {
    const userName = Meteor.user().name;
    event.preventDefault();
    this.setState({
      errorStatus: false,
      errorMessage: "",
      canRateProduct: false,
      successStatus: false,
      successMessage: ""
    });

    // Check if no star is selected and also if there is no review text,
    // Throw error if there's no star and review
    if ((this.state.ratingValue === 0) && (!this.state.reviewText)) {
      Alerts.toast("Please select a rating star", "error");
      this.setState({ errorStatus: true, errorMessage: "Please rate the product or enter a review" });
    } else if ((this.state.ratingValue) > 0 && (!this.state.reviewText)) {
      // Check if there is rating but no reviewtext
      // Compose ratings and review object using details from users input
      const ratingsObject = {
        rating: this.state.ratingValue,
        reviewText: "No review added",
        userName: userName ? userName : "Guest",
        productId: this.productInfo.product._id
      };


      //  Save ratings to the database
      Meteor.call("saveRatings", ratingsObject, (error, reply) => {
        if (error) {
          return error; //eslint-disable-line
        }
        this.setState({
          reviews: reply,
          reviewText: "",
          ratingValue: 0
        });
        Alerts.toast("Ratings saved", "success");
        setTimeout(() => {
          this.cancelReview();
        }, 1000);
      });
    } else {
      // Compose ratings and review object using details from users input if otherwise
      const ratingsObject = {
        rating: this.state.ratingValue,
        reviewText: this.state.reviewText,
        userName: userName ? userName : "Guest",
        productId: this.productInfo.product._id
      };

      //  Save ratings to the database
      Meteor.call("saveRatings", ratingsObject, (error, reply) => {
        if (error) {
          return error; //eslint-disable-line
        }
        this.setState({
          reviews: reply,
          reviewText: "",
          ratingValue: 0 });
        Alerts.toast("Ratings saved successfully", "success");
        setTimeout(() => {
          this.cancelReview();
        }, 1000);
      });
    }
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   * @desc cancels review and sets state to initial state
   */
  cancelReview() {
    this.setState({
      displayForm: false,
      addReviewBtn: true,
      reviewText: "",
      ratingValue: 0 });
  }
  /**
   * @param { object } event event on target element
   * @memberof Ratings
   * @desc accepts user inputs and saves it in state
   */
  handleUserInput(event) {
    event.preventDefault();
    this.setState({
      [ event.target.name ]: event.target.value
    });
  }

  /**
   * @param { object } event event on target element
   * @memberof Ratings
   * @desc gets the value of rating star
   */
  getStarValue(event) {
    this.setState({ ratingValue: event }); //eslint-disable-line
  }

  render() {
    return (
      <div>
        <div>
          <RatingsForm
            showReviewForm = {this.showReviewForm}
            displayForm = {this.state.displayForm}
            saveReview = {this.saveReview}
            handleUserInput = {this.handleUserInput}
            addReviewBtn = {this.state.addReviewBtn}
            getStarValue = {this.getStarValue}
            cancelReview = {this.cancelReview}
            value= {this.state.ratingValue}
            reviews = {this.state.reviews}
          />
        </div>
      </div>
    );
  }
}

export default Ratings;
