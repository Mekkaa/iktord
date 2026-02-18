import Button from "@/src/components/Button";
import { FC } from "react";

type UIType = {};

const UI: FC<UIType> = (props) => {
  return (
    <div className="flex gap-1">
      <Button>Button primary</Button>
      <Button variant="secondary">Button secondary</Button>
      <Button variant="ghost">Button ghost</Button>
    </div>
  );
};

export default UI;
