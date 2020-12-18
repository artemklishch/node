const fs = require("fs");
const { join } = require("path");
const path = require("path");

// fs.mkdir(path.join(__dirname, "notes"), (err) => {
//   if (err) throw err;
//   console.log("Папка была создана");
// });

// fs.writeFile(
//   path.join(__dirname, "notes", "mynotes.txt"),
//   "Hello world!",
//   (err) => {
//     if (err) throw err;
//     console.log("Файл был создан");
//     fs.appendFile(
//       path.join(__dirname, "notes", "mynotes.txt"),
//       " From appen file",
//       (err) => {
//         if (err) throw err;
//         console.log("Файл был изменен");

//         fs.readFile(
//           path.join(__dirname, "notes", "mynotes.txt"),
//           "utf-8",
//           (err, data) => {
//             if (err) throw err;
//             // console.log(Buffer.from(data).toString());
//             console.log(data);
//           }
//         );
//       }
//     );
//   }
// );

// fs.rename(
//   path.join(__dirname, "notes", "mynotes.txt"),
//   path.join(__dirname, "notes", "theirnotes.txt"),
//   (err) => {
//     if (err) throw err;
//     console.log("Фвйл переименован");
//   }
// );

// fs.unlink("/tmp/hello", (err) => {
//   if (err) throw err;
//   console.log("successfully deleted /tmp/hello");
// });
// (async function(path) {
//     try {
//       await fs.unlink(path);
//       console.log(`successfully deleted ${path}`);
//     } catch (error) {
//       console.error('there was an error:', error.message);
//     }
//   })('/tmp/hello');

fs.stat(path.join(__dirname, "notes", "theirnotes.txt"), (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});



async function print(path) {
    const dir = await fs.promises.opendir(path);
    console.log('0909090909', dir)
    for await (const dirent of dir) {
        console.log('sdfdfsdsfg', dirent)
      console.log(dirent.name);
    }
  }
  print('./').catch(console.error);
