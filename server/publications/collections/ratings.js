import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  saveRatings: function (userObject) {
    check(userObject, Object);
    userObject.userid = Meteor.userId();
    Collections.Ratings.insert(userObject);
    return Collections.Ratings.find({ productId: userObject.productId }).fetch();
  },
  fetchRatings: function (id) {
    check(id, String);
    return Collections.Ratings.find({ productId: id }).fetch();
  }
});
