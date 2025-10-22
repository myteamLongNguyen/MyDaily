import { CheckOutlined } from "./icons/check-outlined";

interface Props {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox(props: Props) {
  const { checked, onChange } = props;

  return (
    <label className="flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        className="input border mr-2"
        checked={checked}
        onChange={onChange}
      />
      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <CheckOutlined className="text-common-white w-5 h-5" />
      </span>
    </label>
  );
}
