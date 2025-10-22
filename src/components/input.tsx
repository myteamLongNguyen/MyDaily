import { ChangeEvent, FocusEventHandler } from "react";

interface InputProps {
  inputType?: "input" | "textarea";
  type?: string;
  label?: string;
  id?: string;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  errorText?: string;
  exClassName?: string;
  exWrapClassName?: string;
  min?: string | number | undefined;
  max?: string | number | undefined;
  readonly?: boolean;
  disabled?: boolean;
  pattern?: string | undefined;
  rows?: number;
  areaResize?: boolean;
  onChange?: (e: ChangeEvent<any>) => void;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
}

export default function Input(props: InputProps) {
  const {
    inputType = "input",
    placeholder,
    type = "text",
    label,
    value,
    defaultValue,
    id,
    errorText,
    onChange,
    onFocus,
    onBlur,
    exClassName,
    exWrapClassName,
    min,
    max,
    readonly,
    disabled,
    pattern,
    rows = 3,
    areaResize = true,
  } = props;

  return (
    <div className={`${exWrapClassName}`}>
      {label && (
        <label
          className={`block text-xs ${
            disabled ? "text-action-disabled" : "text-text-title"
          }`}
        >
          {label}
        </label>
      )}
      {inputType === "input" ? (
        <input
          id={id}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          readOnly={readonly}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={(evt) => {
            if (type === "number") {
              evt.key === "e" && evt.preventDefault();
            }
          }}
          pattern={pattern}
          className={`bg-background-paper border border-divider ${
            readonly ? "text-text-title bg-action-hover" : ""
          } ${
            disabled ? "text-action-disabled" : "text-text-primary"
          } sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${exClassName}`}
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue as string}
          disabled={disabled}
          value={value as string}
          rows={rows}
          readOnly={readonly}
          onChange={onChange}
          style={{
            resize: areaResize ? undefined : "none",
          }}
          className={`bg-background-paper border border-divider ${
            disabled ? "text-action-disabled" : "text-text-primary"
          } sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${exClassName}`}
        />
      )}
      {errorText && <p className="text-error-main text-xs">{errorText}</p>}
    </div>
  );
}
