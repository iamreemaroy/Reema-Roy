export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      keywords,
      thumbnail,
      content,
    } = req.body;

    const date = new Date().toISOString();

    const fileName = `${date.split("T")[0]}-${slug}.md`;

    const markdown = `---
title: "${title}"
meta_description: "${metaDescription}"
meta_keywords:
${keywords
  .split(",")
  .map((k) => `  - ${k.trim()}`)
  .join("\n")}
author: Reema Roy
date: ${date}
thumbnail: ${thumbnail}
slug: ${slug}
meta_title: "${metaTitle}"
---

${content}
`;

    const contentEncoded = Buffer.from(markdown).toString("base64");

    const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/blog/_posts/${fileName}`;

    const response = await fetch(githubUrl, {
      method: "PUT",
      headers: {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
},
      body: JSON.stringify({
        message: `Add blog post: ${title}`,
        content: contentEncoded,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
  console.error(data);

  return res.status(500).json({
    success: false,
    error: data,
  });
}

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
