declare module "react-switch-selector" {
  import { FC } from "react";

  export interface Option {
    label: string;
    value: string;
  }

  interface SwitchSelectorProps {
    options: Option[];
    onChange: (value: string) => void;
    initialSelectedIndex?: number;
    style?: { [key: string]: React.CSSProperties };
  }

  const SwitchSelector: FC<SwitchSelectorProps>;
  export default SwitchSelector;
}
