import MarkdownIt from "markdown-it";
import { generateJSON } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const md = new MarkdownIt();

export function convertMarkdownToTiptapJson(markdown: string) {
  const html = md.render(markdown); // Markdown → HTML
  const json = generateJSON(html, [StarterKit]); // HTML → Tiptap JSON
  return json;
}