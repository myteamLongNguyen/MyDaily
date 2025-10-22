interface Props {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function Switch(props: Props) {
  const { checked, onChange, label } = props;

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center cursor-pointer">
        <div className="relative inline-block w-11 h-5">
          <input
            type="checkbox"
            id="switch-component"
            className="sr-only peer" // Hide the default checkbox
            checked={checked}
            onChange={onChange}
          />
          <div
            className={`block w-full h-full rounded-full transition-colors duration-300 ${
              checked ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
          <div
            className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
              checked ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
        {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
      </label>
    </div>
  );
}