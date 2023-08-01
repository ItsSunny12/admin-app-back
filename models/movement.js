const mongoose = require("mongoose");
const movementSchema = mongoose.Schema(
  {
    type: String, // compra o venta
    quantity: Number,
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Movement = mongoose.model("Movement", movementSchema);

module.exports = Movement;
