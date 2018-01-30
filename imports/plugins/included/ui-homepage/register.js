import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "category",
  name: "category",
  autoEnable: true,
  registry: [{
    route: "category",
    name: "category",
    label: "Category",
    template: "productCategory",
    workflow: "coreProductWorkflow"
  }],
  layout: []
});
