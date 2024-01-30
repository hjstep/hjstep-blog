const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");
const markdownIt = require("markdown-it");
// const POST_PATH = path.join(process.cwd(), "posts", "react");
const POST_PATH = './markdown/react/'

const parsePOST = () => {
  const files = fs.readdirSync(POST_PATH);
  const posts = files.reduce((result, fileName) => {
    const file = fs.readFileSync(path.join(POST_PATH, fileName), "utf8");
    const { attributes, body } = frontMatter(file);
    // Markdown을 HTML로 변환
    const htmlBody = markdownIt().render(body);
    result.push({ attributes, htmlBody });
    return result;
  }, []);
  return posts;
};

(async () => {
  const posts = await parsePOST();
  console.log("-----");
    // console.log(posts);
    console.log(JSON.stringify({ posts }));

  // JSON 파일로 저장
  const jsonFilePath = "./data/react.json";
  fs.writeFile(jsonFilePath, JSON.stringify({ posts }), "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file created successfully.");
    }
  });
})();
