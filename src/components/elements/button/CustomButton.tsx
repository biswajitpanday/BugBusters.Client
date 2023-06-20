import { FC } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface CustomButtonProps extends ButtonProps {
  color?: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  style,
  color,
}) => {
  return (
    <Button variant={variant} style={style} color={color}>
      {children}
    </Button>
  );
};

export default CustomButton;
