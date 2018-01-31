import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Reaction } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        renderChild: true,
        facets: [],
        filter: ""
      };
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({ value });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleFilterChange = (event) => {
      this.setState({
        filter: {
          value: event.target.value,
          name: event.target.name
        }
      });
    }

    handleFilterClick = () => {
      const element = document.getElementById("filterSearch");
      element.classList.toggle("show");
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }

    handleChildUnmount = () => {
      this.setState({ renderChild: false });
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                handleFilterChange={this.handleFilterChange}
                handleFilterClick={this.handleFilterClick}
                handleToggle={this.handleToggle}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                filter={this.state.filter}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

registerComponent("SearchSubscription", SearchSubscription, [wrapComponent]);

export default compose(wrapComponent)(SearchSubscription);
