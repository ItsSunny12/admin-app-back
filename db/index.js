const mongoose = require("mongoose");

const dbConect = (app) => {
  mongoose
    .connect(
      `mongodb+srv://msLopez94:${process.env.MONGO_DB_PASS}@devcluster.ef84aft.mongodb.net/app-books?retryWrites=true&w=majority`
    )
    .then((result) => {
      const PORT = process.env.PORT;
      app.listen(PORT, () => {
        console.log(`El servidor esta esuchando en el puerto ${PORT}...`);
      });
      console.log("Conexion exitosa a la BBDD");
    })
    .catch((error) => console.log(error));
};

module.exports = dbConect;
