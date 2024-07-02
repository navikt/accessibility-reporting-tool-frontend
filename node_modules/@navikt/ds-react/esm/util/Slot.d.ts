import * as React from "react";
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}
export declare const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
export {};
