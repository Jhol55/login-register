import { cn } from "@/lib/utils";
import { FormControlProps } from "./form-control.type";
import { forwardRef } from "react";


export const FormControl = forwardRef<HTMLElement, FormControlProps>(({
    variant = "label",
    className,
    children,
    ...props
}: FormControlProps) => {
    const Component = variant;

    const styles = {
        label: `text-sm font-medium w-fit self-start`,
        legend: "",
        fieldset: ""
    }

    return (
        <Component
            className={cn(
                className,
                styles[variant])}
            {...props}
        >
            {children}
        </Component>
    )
});

FormControl.displayName = "FormControl";