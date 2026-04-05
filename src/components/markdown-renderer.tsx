'use client';

import React from 'react';

function parseLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, boldMatch.index)}</span>);
      }
      parts.push(<strong key={key++} className="font-bold text-foreground">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }

  return parts;
}

export function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  const lines = content.split('\n');

  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    if (/^#{1,3}\s/.test(trimmed)) {
      const text = trimmed.replace(/^#{1,3}\s+/, '');
      elements.push(
        <p key={key++} className="font-bold text-foreground text-base mt-3 mb-1">
          {parseLine(text)}
        </p>
      );
      continue;
    }

    if (/^[-•]\s/.test(trimmed)) {
      const text = trimmed.replace(/^[-•]\s+/, '');
      elements.push(
        <div key={key++} className="flex gap-2 pl-2 mb-0.5">
          <span className="text-primary mt-0.5 shrink-0">•</span>
          <span>{parseLine(text)}</span>
        </div>
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (match) {
        elements.push(
          <div key={key++} className="flex gap-2 pl-2 mb-0.5">
            <span className="text-primary font-bold shrink-0">{match[1]}.</span>
            <span>{parseLine(match[2])}</span>
          </div>
        );
        continue;
      }
    }

    elements.push(
      <p key={key++} className="mb-1">
        {parseLine(trimmed)}
      </p>
    );
  }

  return (
    <div className={className ?? 'text-sm text-foreground/70 leading-relaxed'}>
      {elements}
    </div>
  );
}
