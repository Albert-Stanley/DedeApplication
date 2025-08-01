"use client";
import React, { useEffect, useRef } from "react";
import { createInput } from "@gluestack-ui/input";
import { View, Pressable, TextInput, Animated } from "react-native";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import {
  withStyleContext,
  useStyleContext,
} from "@gluestack-ui/nativewind-utils/withStyleContext";
import { cssInterop } from "nativewind";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/icon";
import { useTheme } from "@/stores/useThemeStore";

const SCOPE = "INPUT";

// Context para gerenciar estado do floating label
const FloatingLabelContext = React.createContext<{
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  hasValue: boolean;
  setHasValue: (hasValue: boolean) => void;
}>({
  isFocused: false,
  setIsFocused: () => {},
  hasValue: false,
  setHasValue: () => {},
});

const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true,
    },
  },
});

const inputStyle = tva({
  base: "border-background-300 flex-row overflow-hidden content-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[focus=true]:hover:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300 items-center relative",

  variants: {
    size: {
      xl: "h-12",
      lg: "h-11",
      md: "h-10",
      sm: "h-9",
    },

    variant: {
      underlined:
        "rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700",

      outline:
        "rounded border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error",

      rounded:
        "rounded-full border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error",
    },
  },
});

const inputIconStyle = tva({
  base: "justify-center items-center text-typography-400 fill-none",
  parentVariants: {
    size: {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    },
  },
});

const inputSlotStyle = tva({
  base: "justify-center items-center web:disabled:cursor-not-allowed",
});

const inputFieldStyle = tva({
  base: "flex-1 text-typography-900 py-auto placeholder:text-typography-500 h-full ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed",

  parentVariants: {
    variant: {
      underlined: "web:outline-0 web:outline-none px-0",
      outline: "web:outline-0 web:outline-none px-3",
      rounded: "web:outline-0 web:outline-none px-4",
    },

    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
});

// Componente FloatingLabel
const FloatingLabel: React.FC<{
  label: string;
  variant?: string;
  size?: string;
}> = ({ label, variant = "outline", size = "md" }) => {
  const { isFocused, hasValue } = React.useContext(FloatingLabelContext);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue, animatedValue]);

  const getSizeValues = () => {
    switch (size) {
      case "sm":
        return {
          normalTop: 10,
          floatingTop: -8,
          normalSize: 14,
          floatingSize: 12,
          leftPos: 12,
        };
      case "lg":
        return {
          normalTop: 14,
          floatingTop: -8,
          normalSize: 16,
          floatingSize: 12,
          leftPos: 16,
        };
      case "xl":
        return {
          normalTop: 16,
          floatingTop: -8,
          normalSize: 18,
          floatingSize: 12,
          leftPos: 16,
        };
      default: // md
        return {
          normalTop: 12,
          floatingTop: -8,
          normalSize: 16,
          floatingSize: 12,
          leftPos: 14,
        };
    }
  };

  const { normalTop, floatingTop, normalSize, floatingSize, leftPos } =
    getSizeValues();

  const labelStyle = {
    position: "absolute" as const,
    left: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [leftPos, leftPos - 2],
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [normalTop, floatingTop],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [normalSize, floatingSize],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        theme === "dark"
          ? "rgba(156, 163, 175, 0.7)"
          : "rgba(107, 114, 128, 0.7)",
        theme === "dark" ? "#60A5FA" : "#3B82F6",
      ],
    }),
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", theme === "dark" ? "#1F2937" : "#FFFFFF"],
    }),
    paddingHorizontal: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
    zIndex: 10,
    pointerEvents: "none" as const,
  };

  return <Animated.Text style={labelStyle}>{label}</Animated.Text>;
};

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & {
    className?: string;
    label?: string;
    floatingLabel?: boolean;
  };

const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(
  (
    {
      className,
      variant = "outline",
      size = "md",
      label,
      floatingLabel = true, 
      children,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    return (
      <FloatingLabelContext.Provider
        value={{ isFocused, setIsFocused, hasValue, setHasValue }}
      >
        <View className={floatingLabel ? "relative" : ""}>
          <UIInput
            ref={ref}
            {...props}
            className={inputStyle({ variant, size, class: className })}
            context={{ variant, size, floatingLabel }}
          >
            {children}
          </UIInput>
          {floatingLabel && label && (
            <FloatingLabel label={label} variant={variant} size={size} />
          )}
        </View>
      </FloatingLabelContext.Provider>
    );
  }
);

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & {
    className?: string;
    height?: number;
    width?: number;
  };

const InputIcon = React.forwardRef<
  React.ElementRef<typeof UIInput.Icon>,
  IInputIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === "number") {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
      />
    );
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef<
  React.ElementRef<typeof UIInput.Slot>,
  IInputSlotProps
>(({ className, ...props }, ref) => {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  );
});

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = React.forwardRef<
  React.ElementRef<typeof UIInput.Input>,
  IInputFieldProps
>(({ className, onFocus, onBlur, value, ...props }, ref) => {
  const context = useStyleContext(SCOPE);
  const parentVariant = context?.variant || "outline";
  const parentSize = context?.size || "md";
  const floatingLabel = context?.floatingLabel || false;

  const { setIsFocused, setHasValue } = React.useContext(FloatingLabelContext);
  const theme = useTheme();

  // Monitor value changes
  React.useEffect(() => {
    if (floatingLabel) {
      setHasValue(!!value && value.length > 0);
    }
  }, [value, floatingLabel, setHasValue]);

  const handleFocus = (e: any) => {
    if (floatingLabel) {
      setIsFocused(true);
    }
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    if (floatingLabel) {
      setIsFocused(false);
    }
    onBlur?.(e);
  };

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      keyboardAppearance={theme === "dark" ? "dark" : "light"}
      className={inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

Input.displayName = "Input";
InputIcon.displayName = "InputIcon";
InputSlot.displayName = "InputSlot";
InputField.displayName = "InputField";

export { Input, InputField, InputIcon, InputSlot };
