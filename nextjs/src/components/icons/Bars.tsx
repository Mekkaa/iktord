import IconWrapper, { IconProps } from "../IconWrapper";

const Bars = (props: IconProps) => (
  <IconWrapper {...props} width={32} height={32}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5H30V7H2V5ZM2 25H30V27H2V25ZM30 15H2V17H30V15Z"
    />
  </IconWrapper>
);

export default Bars;
