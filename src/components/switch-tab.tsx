interface Props {
  options: string[];
  tab: string;
  setTab: (value: string) => void;
}

export default function SwitchTab(props: Props) {
  const { options, tab, setTab } = props;

  return (
    <div className="max-w-1/2 flex items-center space-x-1 bg-action-selected p-0.5 rounded-lg">
      {options.map((t: string) => (
        <div
          key={t}
          className={`text-sm cursor-pointer p-1.5 truncate ${
            t === tab
              ? "shadow bg-background-paper rounded text-text-primary font-medium"
              : "text-text-title"
          }`}
          onClick={() => setTab(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
