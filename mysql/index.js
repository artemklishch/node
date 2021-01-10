const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;
const todoRoutes = require("./routes/todo");

app.use(express.static(path.join(__dirname, "public"))); // делаем статической папку, т.к. нам не придется обрабатывать много get запросов, т.к. теперь используем фреймверк

// routes
app.use("/api/todo", todoRoutes);

app.use((req, res, next) => {
  res.sendFile("/index.html"); // означает, что при каждом запросе ответ возвращает файл index.html
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
