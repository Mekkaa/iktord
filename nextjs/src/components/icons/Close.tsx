import IconWrapper, { IconProps } from "../IconWrapper";

const Close = (props: IconProps) => (
  <IconWrapper {...props} width={32} height={32}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.0001 17.4142L3.70718 29.7071L2.29297 28.2929L14.5859 16L2.293 3.70712L3.70721 2.29291L16.0001 14.5858L28.293 2.29291L29.7072 3.70712L17.4143 16L29.7072 28.2929L28.293 29.7071L16.0001 17.4142Z"
    />
  </IconWrapper>
);

export default Close;
