import fs from "fs";

export function getPostData() {
  const json = fs.readFileSync("lib/posts.json", "utf8");
  const data = JSON.parse(json);

  return data;
}

/** URLクエリを以下の文字列に変換する
 * { key: "value" } => "key=value"
 * { key1: 'value1', key2: 'value2' } => "key1=value1&key2=value2"
 * {} => ""
 */
export function queryToString(obj: any) {
  return Object.entries(obj)
    .map(entry => entry.join("="))
    .join("&");
}


