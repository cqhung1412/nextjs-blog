import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDir = path.join(process.cwd(), "posts");

export function getSortedPostData() {
  // get filenames under /posts
  const fileNames = fs.readdirSync(postDir);
  const postData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postDir, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Parse post metadata section
    const matterResult = matter(fileContent);

    // Combine the data with id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // Sort posts by date
  return postData.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDir);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postDir, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  // Parse post metadata section
  const matterResult = matter(fileContent);

  // Convert markdown to html string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const htmlContent = processedContent.toString();

  // Combine the data with the id, htmlContent
  return {
    id,
    htmlContent,
    ...(matterResult.data as { title: string; date: string }),
  };
}
