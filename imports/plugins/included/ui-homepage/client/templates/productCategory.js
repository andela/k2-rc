import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.productCategory.helpers({
  productComponent() {
    return Components.ProductCategories;
  }
});
