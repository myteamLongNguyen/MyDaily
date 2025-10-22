interface Props {
  label: string;
}

export default function StyledLabel(props: Props) {
  const { label } = props;

  return <label className="text-xs text-text-title mb-1">{label}</label>;
}
