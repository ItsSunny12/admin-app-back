const Book = require("../models/book");
const Movement = require("../models/movement");

const getBooks = async (req, res) => {
  const books = await Book.aggregate([
    {
      $match: { deleted: false },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "movements",
        localField: "_id",
        foreignField: "book",
        as: "movements",
      },
    },
    {
      $unwind: {
        path: "$movements",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: { _id: "$_id", name: "$name", author: "$author", price: "$price" },
        stock: {
          $sum: "$movements.quantity",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        author: "$_id.author",
        price: "$_id.price",
        stock: 1,
      },
    },
    { $sort: { stock: -1 } },
  ]);

  res.status(200).json({ ok: true, books, count: books.length });
};

const createBook = (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      ok: false,
      message: "el campo nombre del libro es obligatorio",
    });
    return;
  }
  const newBook = new Book(req.body);

  newBook
    .save()
    .then((book) => {
      res.status(201).json({ ok: true, book });
    })
    .catch((err) => console.log(err));
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndUpdate(id, {
    deleted: true,
  });
  res.status(200).json({ ok: true, message: "Libro eliminado con exito" });
};

const createMovement = (req, res) => {
  const { bookId } = req.params;
  const { type, quantity } = req.body;

  const newMovement = new Movement({
    type,
    quantity: type === "Compra" ? quantity : quantity * -1,
    book: bookId,
  });

  newMovement
    .save()
    .then((movement) => {
      res.status(201).json({ ok: true, movement });
    })
    .catch((err) => console.log(err));
};

const deleteMovement = async (req, res) => {
  const { id } = req.params;
  await Movement.findByIdAndUpdate(id, {
    deleted: true,
  });
  res
    .status(200)
    .json({ ok: true, message: "Movimiento de stock eliminado con exito" });
};

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  createMovement,
  deleteMovement,
};
