import { Template } from "meteor/templating";
import { Reaction } from "/client/api";

Template.homepageCategories.events({
  "click button": function (event) {
    event.preventDefault();
    localStorage.setItem("category", event.target.value);
    Reaction.Router.go("category");
  }
});

Template.homepageDigitalParallax.events({
  "click button": function (event) {
    event.preventDefault();
    localStorage.setItem("category", event.target.value);
    Reaction.Router.go("category");
  }
});
