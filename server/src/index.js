import app from "./app.js";
import connectDb from "./connection/connection.js";

const PORT = 3000

connectDb()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`server is listning on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(` error is listning port ${PORT} : ${error}`);
  });
