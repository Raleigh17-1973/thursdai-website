// TODO Week 6: replace with real DOCX generated from python-docx pipeline
export async function GET() {
  const content = `FRIA TEMPLATE — PLACEHOLDER\n\nThis template requires real content from the Trust & Compliance Lead before launch.\n\nSee implementation plan Week 6 for generation instructions.`;
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="thursdai-fria-template.txt"',
    },
  });
}
