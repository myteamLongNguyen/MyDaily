import { ChangeEvent, CSSProperties, ReactNode, useState } from "react";

interface Props {
  setFile: (file: File) => void;
  exClassName?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function FileUploadWrapper(props: Props) {
  const { exClassName, setFile, children, style } = props;

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange({
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`w-full h-full ${exClassName} ${
        isDragging
          ? "border border-success-main border-dashed rounded-lg"
          : "border-none rounded-none"
      }`}
      style={style}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
