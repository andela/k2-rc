import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import startIntro from "../../tour/tour";
import * as Collections from "../../../../../lib/collections/collections";
import { Meteor } from "meteor/meteor";

class ProductGrid extends Component {
  constructor(props) {
    super(props);

    this.startIntroBtn = this.startIntroBtn.bind(this);
  }

  static propTypes = {
    isSearch: PropTypes.bool,
    products: PropTypes.array
  };

  
  renderProductGridItems = products => {
    if (Array.isArray(products)) {
      return products.map((product, index) => {
        return <Components.ProductGridItems {...this.props} product={product} key={index} index={index} />;
      });
    }
    return (
      <div className="row">
        <div className="text-center">
          <h3>
            <Components.Translation defaultValue="No Products Found" i18nKey="app.noProductsFound" />
          </h3>
        </div>
      </div>
    );
  };

  componentWillReceiveProps(nextProps) {
    // Check if the user is logged in
    // If not logged in, check local storage
    // if local storage returns false, start tour
    if (Meteor.user().emails.length === 0) {
      // Check localstorage
      const checkTourStatus = localStorage.getItem("takenTour");
      !checkTourStatus ? startIntro.tour() : null;
    } else {
      // Find logged-in user to see if user has taken tour, if not, start tour
      const user = Collections.Accounts.find({ userId: Meteor.userId() }).fetch();
      if (!user[0].takenTour) {
        startIntro.tour();
      }
    }
  }

  startIntroBtn(event) {
    event.preventDefault();
    startIntro.startManualTour();
  }
  render() {
    return (
      <div className="container-main-padded">
        <div className="product-grid">
          {Array.isArray(this.props.products) && (
            <header className="title-section">
              <div className="line" />
              <center>
                <h1 className="title-main">{this.props.isSearch ? "Search Results" : "Explore Products"}</h1>
              </center>
              <div className="line" />
            </header>
          )}
          <Components.DragDropProvider>
            <ul className="product-grid-list list-unstyled" id="product-grid-list">
              {this.renderProductGridItems(this.props.products)}
            </ul>
          </Components.DragDropProvider>
          <div className="tourBtn">
            <a href="#" onClick={this.startIntroBtn}>
              Retake Tour
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductGrid;
