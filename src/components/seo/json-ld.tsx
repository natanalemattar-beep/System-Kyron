'use client';

import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component to safely inject JSON-LD structured data into the page.
 * This helps AIs and Search Engines understand the semantic context of the content.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id={`json-ld-${Math.random().toString(36).substr(2, 9)}`}
    />
  );
}
