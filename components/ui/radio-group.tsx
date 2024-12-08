import React from "react";
import {
  RadioGroup as RadixRadioGroup,
  RadioGroupItem as RadixRadioGroupItem,
} from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";

const radioGroupStyles = cva("space-y-2", {
  variants: {
    orientation: {
      horizontal: "flex space-x-4",
      vertical: "space-y-2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const radioGroupItemStyles = cva("relative flex items-center", {
  variants: {
    size: {
      default: "h-4 w-4 border border-gray-300 bg-white",
      sm: "h-3 w-3 border border-gray-300 bg-white",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface RadioGroupProps extends React.ComponentProps<typeof RadixRadioGroup> {
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <RadixRadioGroup
        className={radioGroupStyles({ orientation, class: className })}
        ref={ref}
        {...props}
      />
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadixRadioGroupItem> {
  size?: "default" | "sm";
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <RadixRadioGroupItem
        className={radioGroupItemStyles({ size, class: className })}
        ref={ref}
        {...props}
      />
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
