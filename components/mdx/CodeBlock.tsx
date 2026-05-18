import CopyCodeButton from "@/components/mdx/CopyCodeButton";

type CodeBlockProps = {
  children: React.ReactNode;
  language: string;
  rawCodeText: string;
};

export default function CodeBlock({
  children,
  language,
  rawCodeText,
}: CodeBlockProps) {
  return (
    <div className="article-code-block">
      <div className="article-code-block__toolbar">
        <span className="article-code-block__language">{language}</span>
        <CopyCodeButton rawCodeText={rawCodeText} />
      </div>

      <div className="article-code-block__content">{children}</div>
    </div>
  );
}
