import express from "express";
const app = express();
const port = 3000;

// 2 args: (1) is Port, (2) is Callback Function
app.listen(port, () => {console.log(`Server running on port ${port}.`)})
