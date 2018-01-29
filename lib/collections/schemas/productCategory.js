import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";


export const ProductCategory = new SimpleSchema({
  _id: {
    type: String,
    label: "ProductCategory Id"
  },
  title: {
    type: String,
    defaultValue: "",
    label: "ProductCategory Title"
  },
  isDigital: {
    type: Boolean,
    defaultValue: false,
    label: "isDigital"
  }
});
registerSchema("ProductCategory", ProductCategory);
export default ProductCategory;
