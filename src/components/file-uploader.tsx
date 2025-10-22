import { ChangeEvent } from "react";

interface Props {
  accept?: string;
  setFile: (file: File) => void;
  exClassName?: string;
}

export default function FileUploader(props: Props) {
  const { exClassName, accept, setFile } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
      className={`flex items-center justify-center w-full ${exClassName}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        // htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border border-divider border-dashed rounded-lg cursor-pointer bg-background-default hover:bg-action-hover"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-10 w-10 text-text-title"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          <p className="text-sm text-text-title">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-text-title">
            {/* PDF, Word documents, and other file formats (e.g., TXT, CSV, DOCX). */}
            PDF, Word documents (e.g., TXT, PDF, DOCX).
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept={accept}
          multiple={false}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
