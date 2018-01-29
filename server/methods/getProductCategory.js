import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";

Meteor.methods({
  productCategory: () =>  Collections.ProductCategory.find().fetch()
});
