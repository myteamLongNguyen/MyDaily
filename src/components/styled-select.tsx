import Select, {
  components,
  CSSObjectWithLabel,
  MenuPosition,
  MultiValue,
  SingleValue,
} from "react-select";
import chroma from "chroma-js";
import { OptionValue } from "../types/component";
import { isValidHexColor } from "../core/utils";
import { ArrowDownOutlined } from "./icons/arrow-down-outlined";
import { CloseOutlined } from "./icons/close-outlined";

interface StyledSelectProps {
  exClassName?: string;
  placeHolder?: string;
  value?: OptionValue | OptionValue[];
  options: OptionValue[];
  multiple?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onChange?: (
    value: SingleValue<OptionValue> | MultiValue<OptionValue>
  ) => void;
  exControl?: CSSObjectWithLabel;
  exValueContainer?: CSSObjectWithLabel;
  exIndicatorsContainer?: CSSObjectWithLabel;
  exInput?: CSSObjectWithLabel;
  exSingleValue?: CSSObjectWithLabel;
  exMultiValue?: CSSObjectWithLabel;
  exMultiValueRemove?: CSSObjectWithLabel;
  exOption?: (value: OptionValue) => CSSObjectWithLabel;
  loading?: boolean;
  menuPosition?: MenuPosition;
  isCloseMenuOnSelect?: boolean;
}

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export default function StyledSelect(props: StyledSelectProps) {
  const {
    exClassName,
    value,
    options,
    multiple,
    isClearable = true,
    isSearchable = true,
    onChange,
    exControl,
    exValueContainer,
    exIndicatorsContainer,
    exInput,
    exSingleValue,
    exMultiValue,
    exMultiValueRemove,
    exOption,
    placeHolder,
    loading = false,
    menuPosition,
    isCloseMenuOnSelect
  } = props;

  const DropdownIndicator = (props: any) => {
    const { menuIsOpen } = props.selectProps;
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDownOutlined
          className="text-text-title"
          style={{
            height: 15,
            width: 15,
            transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-in-out",
            transitionProperty: "transform",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  const ClearIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <CloseOutlined
          className="text-text-title cursor-pointer"
          style={{
            height: 15,
            width: 15,
          }}
        />
      </components.DropdownIndicator>
    );
  };

  return loading ? (
    <div
      className={`h-10 p-2 text-text-title flex items-center bg-background-paper border border-divider text-text-primary sm:text-sm rounded-lg block focus:outline-none ${exClassName}`}
    >
      Loading...
    </div>
  ) : (
    <Select
      className={`bg-background-paper border border-divider text-text-primary sm:text-sm rounded-lg block focus:outline-none ${exClassName}`}
      styles={{
        control: (provided) => ({
          ...provided,
          border: "none",
          boxShadow: "none",
          borderRadius: "8px",
          background: "#FFFFFF",
          ...exControl,
        }),
        valueContainer: (styles) => {
          return {
            ...styles,
            margin: 0,
            padding: 10,
            ...exValueContainer,
          };
        },
        indicatorsContainer: (styles) => {
          return {
            ...styles,
            ...exIndicatorsContainer,
          };
        },
        input: (styles) => {
          return {
            ...styles,
            margin: 0,
            padding: 0,
            ...exInput,
          };
        },
        singleValue: (styles, { data }) => {
          let dotStyles = {};
          if (typeof data.value === "string" && isValidHexColor(data.value)) {
            dotStyles = dot(data.value);
          }
          return {
            ...styles,
            margin: 0,
            ...dotStyles,
            ...exSingleValue,
          };
        },
        multiValue: (styles, { data }) => {
          return {
            ...styles,
            backgroundColor: "rgb(203 213 225)",
            ...exMultiValue,
          };
        },
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          ":hover": {},
          ...exMultiValueRemove,
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          let color = null;
          if (typeof data.value === "string" && isValidHexColor(data.value)) {
            color = chroma(data.value);
          }
          return {
            ...styles,
            display: "flex",
            alignItems: "center",
            zIndex: 111,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? color
                ? color.alpha(0.5).css()
                : "#f1f5f9"
              : isFocused
              ? color
                ? color.alpha(0.1).css()
                : "#f8fafc"
              : undefined,
            cursor: isDisabled ? "not-allowed" : "pointer",
            color: "#020817",
            ":active": {
              ...styles[":active"],
              backgroundColor: !isDisabled
                ? isSelected
                  ? "#f1f5f9"
                  : undefined
                : undefined,
            },
            ...(typeof exOption === "function" ? exOption(data) : {}),
          };
        },
      }}
      menuPosition={menuPosition}
      isClearable={isClearable}
      isSearchable={isSearchable}
      value={value}
      onChange={onChange}
      isMulti={multiple}
      placeholder={placeHolder}
      options={options}
      components={{
        DropdownIndicator: DropdownIndicator,
        ClearIndicator: ClearIndicator,
        IndicatorSeparator: () => null,
      }}
      closeMenuOnSelect = {isCloseMenuOnSelect}
    />
  );
}
