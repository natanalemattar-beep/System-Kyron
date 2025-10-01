
"use client";

import { useRef, type ReactNode } from "react";

type FileInputTriggerProps = {
  children: ReactNode;
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
};

export function FileInputTrigger({
  children,
  onFileSelect,
  acceptedFileTypes = ".pdf",
}: FileInputTriggerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedFileTypes}
      />
      {children}
    </div>
  );
}
