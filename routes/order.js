const express = require("express");
const router = express.Router();
const { getUserById, pushOrderOnPurchaseList } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { updateStock } = require("../controllers/course");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus
} = require("../controllers/order");

// //params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// //create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderOnPurchaseList,
  updateStock,
  createOrder
);
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
