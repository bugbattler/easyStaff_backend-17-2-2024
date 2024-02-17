const orderModel = require("../Models/order");

exports.createOrder = async (req, res) => {
  try {
    const {
        firstName,
        lastName,
        email,
        contact,
        country,
        state,
        city,
        pincode,
        orderItem,
    } = req.body;
    const create_orderModel = new orderModel({
        firstName,
        lastName,
        email,
        contact,
        country,
        state,
        city,
        pincode,
        orderItem,
    });
    create_orderModel
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
// Get all Order's

exports.getOrder = async (req, res) => {
  try {
    const data = await orderModel.find();
    res.json(data);
  } catch {
    (err) => res.json(err);
  }
};

// Get Order's by ID

exports.getSingleOrder = async (req, res) => {
  try {
    const data = await orderModel.find({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};
exports.getOrderByUser = async (req, res) => {
  try {
    const data = await orderModel.find({ ownerEmail: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};

// Update Order's by ID

exports.updateOrder = async (req, res) => {
  try {
    const data = await orderModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const data = await orderModel.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};
