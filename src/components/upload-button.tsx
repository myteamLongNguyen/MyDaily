import { ChangeEvent } from "react";
import { UploadOutlined } from "./icons/upload-outlined";

interface Props {
  accept?: string;
  label?: string;
  setFile: (file: File) => void;
}

export default function UploadButton(props: Props) {
  const { accept, label, setFile } = props;

  return (
    <label
      htmlFor="dropzone-file"
      className="flex items-center py-2 px-5 border border-gray-400 border-dashed rounded-lg font-medium text-sm cursor-pointer hover:bg-action-hover"
    >
      <UploadOutlined className="h-4 w-4 mr-2" />
      {label ?? "Upload or drop"}
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept={accept}
        multiple={false}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            setFile(file);
          }
        }}
      />
    </label>
  );
}
