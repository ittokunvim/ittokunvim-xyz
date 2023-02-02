import fs from "fs";

export function getPostData() {
  const json = fs.readFileSync("lib/posts.json", "utf8");
  const data = JSON.parse(json);

  return data;
}
