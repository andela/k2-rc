import React, { Component } from "react";
import PropTypes from "prop-types";

// proptypes
import { walletProptypes } from "../../config/proptypes";
import roundToTwo from "../../helpers/roundToTwo";

class WalletCheckout extends Component {
  state = {
    showBody: false
  }

  handleButtonClick = () => {
    this.props.checkout(this.props.wallet)
      .then((walletCheckoutSuccess) => {
        Alerts.toast(walletCheckoutSuccess.message);
      })
      .catch((walletCheckoutError) => {
        Alerts.toast(walletCheckoutError.message, walletCheckoutError.type);
      });
  }

  toggleBody = () => {
    this.setState({ showBody: !this.state.showBody });
  }

  render() {
    const { showBody } = this.state;
    return (
      <div className="panel panel-default wallet-checkout">
        <button
          className={`panel-heading wallet-checkout__toggle ${showBody ? "isOpen" : ""}`}
          onClick={this.toggleBody}
        >
          <i className="fa fa-google-wallet" />
          <span id="btn-complete-order" data-i18n="checkoutPayment.completeYourOrder">Wallet</span>
        </button>
        {
          showBody &&
          <div className="panel-body">
            <p className="wallet-checkout__balance">
            Balance: ₦{roundToTwo(this.props.wallet.balance)}
            </p>
            <button
              className="btn btn-success col-md-8 wallet-checkout__pay"
              onClick={this.handleButtonClick}
            >Pay now</button>
          </div>
        }

      </div>
    );
  }
}

WalletCheckout.propTypes = {
  checkout: PropTypes.func.isRequired,
  ...walletProptypes.wallet
};

export default WalletCheckout;
