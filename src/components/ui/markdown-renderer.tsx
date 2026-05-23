'use client';

import React from 'react';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(<strong key={parts.length} className="font-bold text-white/90"><em>{match[2]}</em></strong>);
    } else if (match[3]) {
      parts.push(<strong key={parts.length} className="font-bold text-white/90">{match[3]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={parts.length} className="italic text-white/80">{match[4]}</em>);
    } else if (match[5]) {
      parts.push(<code key={parts.length} className="px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 text-[12px] font-mono">{escapeHtml(match[5])}</code>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function parseLine(line: string, index: number): React.ReactNode {
  const trimmed = line.trim();

  // Empty line
  if (!trimmed) return <br key={`br-${index}`} />;

  // Code block fences are handled at block level
  // Headings
  const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const content = parseInline(headingMatch[2]);
    const size = level === 1 ? 'text-lg font-black' : level === 2 ? 'text-base font-bold' : 'text-sm font-bold';
    return <div key={index} className={`${size} text-white/90 mt-3 mb-1.5`}>{content}</div>;
  }

  // Unordered list
  const ulMatch = trimmed.match(/^[-*+]\s+(.+)/);
  if (ulMatch) {
    return (
      <div key={index} className="flex gap-2 pl-1 my-0.5">
        <span className="text-cyan-400 mt-1 shrink-0">•</span>
        <span>{parseInline(ulMatch[1])}</span>
      </div>
    );
  }

  // Ordered list
  const olMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
  if (olMatch) {
    return (
      <div key={index} className="flex gap-2 pl-1 my-0.5">
        <span className="text-cyan-400/70 text-[11px] font-bold mt-0.5 shrink-0 w-4 text-right">{olMatch[1]}.</span>
        <span>{parseInline(olMatch[2])}</span>
      </div>
    );
  }

  // Regular paragraph
  return <div key={index} className="my-0.5">{parseInline(trimmed)}</div>;
}

export function MarkdownRenderer({ content }: { content: string }) {
  // Split into code blocks and text segments
  const blocks: React.ReactNode[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      const textBlock = content.slice(lastIndex, match.index);
      const lines = textBlock.split('\n');
      blocks.push(
        <div key={`text-${lastIndex}`} className="space-y-0.5">
          {lines.map((line, i) => parseLine(line, i))}
        </div>
      );
    }

    // Code block
    const lang = match[1];
    const code = match[2].replace(/^\n/, '');
    blocks.push(
      <div key={`code-${match.index}`} className="my-2 rounded-xl bg-black/40 border border-white/5 overflow-hidden">
        {lang && (
          <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/30 bg-white/5 border-b border-white/5">
            {lang}
          </div>
        )}
        <pre className="p-3 overflow-x-auto">
          <code className="text-[12px] font-mono text-cyan-200/90 leading-relaxed whitespace-pre-wrap">{escapeHtml(code)}</code>
        </pre>
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < content.length) {
    const textBlock = content.slice(lastIndex);
    const lines = textBlock.split('\n');
    blocks.push(
      <div key={`text-end`} className="space-y-0.5">
        {lines.map((line, i) => parseLine(line, i))}
      </div>
    );
  }

  return <>{blocks}</>;
}
