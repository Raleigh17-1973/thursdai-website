import { codeToHtml } from 'shiki';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  theme?: 'dark' | 'light';
}

export async function SyntaxHighlighter({
  code,
  language,
  theme = 'dark',
}: SyntaxHighlighterProps) {
  const html = await codeToHtml(code, {
    lang: language === 'text' ? 'plaintext' : language,
    theme: theme === 'dark' ? 'github-dark' : 'github-light',
  });

  return (
    <div
      className="shiki-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        fontSize: '14px',
        lineHeight: '1.6',
      }}
    />
  );
}
