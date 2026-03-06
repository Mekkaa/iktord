import dynamic from "next/dynamic";

const Icons = {
  Bars: dynamic(() => import("./Bars")),
  Close: dynamic(() => import("./Close")),
};

export default Icons;
