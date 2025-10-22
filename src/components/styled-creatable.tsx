import {
  components,
  CSSObjectWithLabel,
  MenuPosition,
  MultiValue,
  SingleValue,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { OptionValue } from "../types/component";
import { ArrowDownOutlined } from "./icons/arrow-down-outlined";
import { CloseOutlined } from "./icons/close-outlined";

interface StyledCreatableProps {
  exClassName?: string;
  placeHolder?: string;
  value?: OptionValue;
  options: OptionValue[];
  multiple?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onChange?: (
    value: SingleValue<OptionValue> | MultiValue<OptionValue>
  ) => void;
  onCreateOption?: (value: string) => void;
  exControl?: CSSObjectWithLabel;
  exValueContainer?: CSSObjectWithLabel;
  exIndicatorsContainer?: CSSObjectWithLabel;
  exInput?: CSSObjectWithLabel;
  exSingleValue?: CSSObjectWithLabel;
  exMultiValue?: CSSObjectWithLabel;
  exMultiValueRemove?: CSSObjectWithLabel;
  exOption?: CSSObjectWithLabel;
  loading?: boolean;
  menuPosition?: MenuPosition;
}

export default function StyledCreatable(props: StyledCreatableProps) {
  const {
    exClassName,
    value,
    options,
    multiple,
    isClearable = true,
    isSearchable = true,
    onChange,
    onCreateOption,
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
    <CreatableSelect
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
          return {
            ...styles,
            margin: 0,
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
          return {
            ...styles,
            display: "flex",
            alignItems: "center",
            zIndex: 111,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? "#f1f5f9"
              : isFocused
              ? "#f8fafc"
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
            ...exOption,
          };
        },
      }}
      menuPosition={menuPosition}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isMulti={multiple}
      placeholder={placeHolder}
      onChange={onChange}
      onCreateOption={onCreateOption}
      options={options}
      value={value}
      components={{
        DropdownIndicator: DropdownIndicator,
        ClearIndicator: ClearIndicator,
        IndicatorSeparator: () => null,
      }}
    />
  );
}
