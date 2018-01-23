/* eslint dot-notation: 0 */
import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import { Reaction } from "/server/api";
import { Shops } from "/lib/collections";
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";

Fixtures();


describe("Vendor registration", function () {
  let user;
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    user = Factory.create("account");
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe("Creates vendor account and shop", function () {
    it("should create a new shop for vendor", function (done) {
      sandbox.stub(Reaction, "getPrimaryShopId", () => user.shopId);
      sandbox.stub(Reaction, "hasPermission", () => true);
      sandbox.stub(Meteor, "user", () => user);
      const shopInsertSpy = sandbox.spy(Shops, "insert");
      const userShop = Factory.create("shop");
      const newShop = Meteor.call("shop/createShop", user._id, userShop);
      expect(shopInsertSpy).to.have.been.called;
      expect(newShop).to.be.an("object");
      expect(newShop).to.have.property("shopId");
      return done();
    });
  });
});
