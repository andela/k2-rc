import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Random } from "meteor/random";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name StaticPage
 * @type {SimpleSchema}
 * @memberof schemas
 * @property {String} logType required
 * @property {String} shopId required
 * @property {String} level default: `"info"`, allowed: `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"fatal"`
 * @property {String} source default: `"server"`, allowed: `"client"`, `"server"`
 * @property {Boolean} handled required, default: false
 * @property {Object} data, blackbox
 * @property {Date} date required
 */
export const StaticPage = new SimpleSchema({
  _id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  pageName: {
    label: "Page Name",
    type: String
  },
  pageAddress: {
    label: "Page URL Address",
    type: String
  },
  pageContent: {
    label: "Page Content",
    type: String
  },
  userId: {
    label: "User Identification",
    type: String
  },
  shopId: {
    label: "Shop Identification",
    type: String
  },
  isEnabled: {
    label: "Show page link on navigation bar.",
    type: Boolean
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      return {
        $setOnInsert: new Date()
      };
    }
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

registerSchema("StaticPage", StaticPage);
