const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./utils/database"); // нужно для работы с базой данных, как некая обертка, как mongoose для MongoDB

const PORT = process.env.PORT || 3000;
const todoRoutes = require("./routes/todo");

app.use(express.static(path.join(__dirname, "public"))); // делаем статической папку, т.к. нам не придется обрабатывать много get запросов, т.к. теперь используем фреймверк

app.use(express.json())
// routes
app.use("/api/todo", todoRoutes);


app.use((req, res, next) => {
  res.sendFile("/index.html"); // означает, что при каждом запросе ответ возвращает файл index.html
});

async function start() {
  try {
    // await sequelize.sync({ force: true }); //  {force: true} нужно для того, чтоб изменение структуры моделе вызвало изменения в базе данных, но лучше убирать после обновления
    await sequelize.sync(); 
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
