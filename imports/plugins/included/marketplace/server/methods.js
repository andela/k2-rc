import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/lib/api";
import { Shops } from "/lib/collections";
import { SHOP_WORKFLOW_STATUS_ACTIVE, SHOP_WORKFLOW_STATUS_DISABLED } from "../lib/constants";

const status = [
  SHOP_WORKFLOW_STATUS_ACTIVE,
  SHOP_WORKFLOW_STATUS_DISABLED
];

export function marketplaceUpdateShopWorkflow(shopId, workflowStatus, email) {
  check(shopId, String);
  check(workflowStatus, String);
  check(email, String);

  if (shopId === Reaction.getPrimaryShopId()) {
    throw new Meteor.Error("access-denied", "Cannot change shop status");
  }

  if (!Reaction.hasPermission("admin", this.userId, Reaction.getPrimaryShopId())) {
    throw new Meteor.Error("access-denied", "Cannot change shop status");
  }

  if (status.includes(workflowStatus)) {
    let message = "";
    if (`${workflowStatus}`.toLowerCase() === "active") {
      message = `Your shop has been activated.
        <br>You can now login on reaction commerce to manage your shop.`;
    } else {
      message = `Your shop has been deactivated.
      <br>Contact the administrator for more information`;
    }
    Reaction.Email.send({
      to: email,
      from: "abdulfataiaka@gmail.com",
      subject: "Reaction commerce",
      html: `<h2>Vendor shop status</h2>${message}`
    });
    return Shops.update({
      _id: shopId
    }, {
      $set: {
        "workflow.status": workflowStatus
      }
    }, function (error) {
      if (error) {
        throw new Meteor.Error("server-error", error.message);
      }
    });
  }

  throw new Meteor.Error("server-error", "Workflow status could not be updated, should be 'active' or 'disabled'");
}

Meteor.methods({
  "marketplace/updateShopWorkflow": marketplaceUpdateShopWorkflow
});
