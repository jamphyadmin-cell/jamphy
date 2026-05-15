import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const markdownComponents = {
  p: ({ children }) => <p>{children}</p>,
};

const normalizeMathDelimiters = (value) =>
  String(value)
    .replace(/\\\[/g, "$$")
    .replace(/\\\]/g, "$$")
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$");

export default function MathText({ children, className = "" }) {
  return (
    <div className={`math-copy ${className}`}>
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {normalizeMathDelimiters(children)}
      </ReactMarkdown>
    </div>
  );
}
