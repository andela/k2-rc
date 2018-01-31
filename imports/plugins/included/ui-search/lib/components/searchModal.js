import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import shortid from "shortid";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    filter: PropTypes.object,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handleFilterChange: PropTypes.func,
    handleFilterClick: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string
  }

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-filter"
          i18nKeyLabel="search.filterSearch"
          label="Filters"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleFilterClick}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchFilter() {
    return (
      <div className="hide" id="filterSearch" style={{ marginTop: "20px" }}>
        <div className="container customContainer">
          <div className="row">
            <div className="col-md-3 col-xs-3">
              <label className="transform">Price</label>
              <div className="rui select">
                <select id="price-filter" name="priceFilter" onChange={this.props.handleFilterChange}>
                  <option value="null" selected disabled>Filter by price</option>
                  <option value="all">All prices</option>
                  <option id="firstPrice" value="0-3590">Below $3,590</option>
                  <option value="3590-19745">$3,590 - $19,745</option>
                  <option value="19745-35900">$19,745 - $35,900</option>
                  <option value="35900-179500">$35,900 - $179,500</option>
                  <option value="179500-359000">$179,500 - $359,000</option>
                  <option value="359000-above">Above $359,000</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 col-xs-3">
              <label className="transform">Categories</label>
              <div className="rui select">
                <select id="sortByLatest" name="categoriesFilter" onChange={this.props.handleFilterChange}>
                  <option value="null" selected disabled>Filter by Categories</option>
                  <option value="all">All categoties</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 col-xs-3">
              <label className="transform">Date</label>
              <div className="rui select">
                <select id="sortByLatest" name="dateFilter" onChange={this.props.handleFilterChange}>
                  <option value="null" selected disabled>Filter by date</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 col-xs-3">
              <label className="transform">Vendor</label>
              <div className="rui select">
                <select id="vendor-filter" name="vendorFilter" onChange={this.props.handleFilterChange}>
                  <option value="null" selected disabled>Filter by vendor</option>
                  <option value="all">All vendors</option>
                  {this.getVendor(this.props.products)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getVendor(products) {
    const vendor = products.map(product => {
      return product.vendor;
    });
    const uniqueArray = vendor.filter((item, pos) => {
      return vendor.indexOf(item) === pos;
    });
    const vendors = uniqueArray.map(res => {
      return <option key={shortid.generate()} value={res}>{res}</option>;
    });
    return vendors;
  }

  filter(filter, products) {
    console.log(products[0]);
    if (filter.name === "priceFilter") {
      if (filter.value === "all") return products;
      const priceArray = filter.value.split("-");
      const productsArray = products.filter(product => {
        return product.price.min > priceArray[0] && product.price.min < priceArray[1];
      });
      return productsArray;
    }

    if (filter.name === "categoriesFilter") {
      if (filter.value === "all") return products;
      const productsArray = products.filter(product => {
        return product.vendor === filter.value;
      });
      return productsArray;
    }

    if (filter.name === "dateFilter") {
      if (filter.value === "oldest") {
        return products.reverse();
      }
      return products;
    }

    if (filter.name === "vendorFilter") {
      if (filter.value === "all") return products;
      const productsArray = products.filter(product => {
        return product.vendor === filter.value;
      });
      return productsArray;
    }
    return products;
  }

  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") &&
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          }
        </div>
      );
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span
              className="rui search-tag"
              id={tag._id} key={tag._id}
              onClick={() => this.props.handleTagClick(tag._id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
          {this.props.value.length >= 3 && this.props.products.length < 1 && <h3><b> No product(s) found </b> </h3>}
          {this.renderSearchFilter()}
        </div>
        <div className="rui search-modal-results-container">
          {this.props.products.length > 0 &&
            <ProductGridContainer
              products={this.filter(this.props.filter, this.props.products)}
              unmountMe={this.props.unmountMe}
              isSearch={true}
            />
          }
          {this.props.accounts.length > 0 &&
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy
                  data={this.props.accounts}
                  columns={accountsTable()}
                  onRowClick={this.props.handleAccountClick}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchModal;
