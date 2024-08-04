import { Order } from "../schemas/ordersSchemas.js";

import HttpError from "../generalFiles/HttpError.js";

export async function createOrder(userId, message, files) {
  return await Order.create({ userId, message, files });
}

export async function changeStatusForOwnerOrder(orderId, status) {
  return await Order.findByIdAndUpdate(orderId, { status }, {new: true});
}

export async function cancelledByUserOrder(orderId, id) {
  const { userId } = await Order.findById(orderId);

  if (userId.toString() === id.toString()) {
    return await Order.findByIdAndUpdate(orderId, {
      status: "cancelledUser",
    }, {new: true});
  }

  throw HttpError(403, "user has not rights");
}

export async function getOrders(userId, statusUser) {
  if (statusUser === "owner") {
    return await Order.find({});
  }
  return await Order.find({ userId });
}
