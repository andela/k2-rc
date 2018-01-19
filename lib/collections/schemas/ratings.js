import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name Ratings
 * @memberof schemas
 * @type {SimpleSchema}
 * @property {Number} rating optional
 * @property {String} reviewtext optional
 * @property {String} productId required
 * @property {String} userId required
 * @property {String} createdBy optional
 * @property {Date} createdAt required
 * @property {Date} updatedAt required
 */

export const Ratings = new SimpleSchema({
  rating: {
    type: String,
    optional: true
  },
  userName: {
    type: String,
    optional: true
  },
  reviewText: {
    type: String,
    optional: true
  },
  productId: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    }
  }
});

registerSchema("Ratings", Ratings);
