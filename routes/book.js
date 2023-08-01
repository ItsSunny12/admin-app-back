const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.delete("/:id", bookController.deleteBook);
router.post("/movement/:bookId", bookController.createMovement);
router.delete("/movement/:id", bookController.deleteMovement);

module.exports = router;
