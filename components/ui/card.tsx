import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const cardStyles = cva("rounded-lg border border-card bg-card p-6 shadow-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardStyles> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cardStyles({ variant, class: className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return <div className={`${className} mb-4`} ref={ref} {...props} />;
  }
);
CardHeader.displayName = "CardHeader";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={`${className} text-lg font-semibold`}
        ref={ref}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p className={`${className} text-muted-foreground`} ref={ref} {...props} />
  );
});
CardDescription.displayName = "CardDescription";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div className={className} ref={ref} {...props} />;
  }
);
CardContent.displayName = "CardContent";


export { Card, CardHeader, CardTitle, CardDescription, CardContent };
