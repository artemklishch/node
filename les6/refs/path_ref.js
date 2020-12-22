const path = require("path");

console.log(path.basename(__filename));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log(path.parse(__filename).ext);
console.log(path.parse(__filename).base);

console.log(path.join(__dirname, "test", "second.html"));
console.log(path.resolve(__dirname, "./test", "second.html"));
console.log(path.resolve(__dirname, "test", "/second.html"));

console.log("\n");
console.log(path.win32.basename("C:\\foo.html", ".html"));
// console.log(process.env.PATH);
console.log(
  path.format({
    root: "/ignored",
    dir: "/home/user/dir",
    base: "file.txt",
  })
);
console.log(
  path.format({
    root: "/",
    base: "file.txt",
    ext: "ignored",
  })
);
console.log(
  path.format({
    root: "/",
    name: "file",
    ext: ".txt",
  })
);
console.log(
  path.format({
    dir: "C:\\path\\dir",
    base: "file.txt",
  })
);
console.log(path.relative("C:\\orandea\\test\\aaa", "C:\\orandea\\impl\\bbb"));
console.log(path.resolve("/foo/bar", "./baz"));
console.log(path.resolve("/foo/bar", "/tmp/file/"));
console.log(path.resolve("wwwroot", "static_files/png/", "./gif/image.gif"));
console.log(
  path.resolve("wwwroot", "static_files/png/", "../../gif/image.gif")
);
console.log(path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"));

console.log("\n");
console.log("foo/bar/baz".split(path.sep));
console.log("foo/bar/baz".split("/"));
console.log("foo\bar\baz".split(path.sep));
console.log("foo\\bar\\baz".split(path.sep));
console.log(path.toNamespacedPath(__dirname, "test", "second.html"));
console.log(path.win32);
console.log(path);
console.log(path.delimiter);
