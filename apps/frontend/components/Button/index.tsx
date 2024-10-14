import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
  TypographyProps,
} from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  typographyProps?: TypographyProps;
}

const Button = ({
  typographyProps = {},
  startIcon,
  endIcon,
  children,
  ...rest
}: React.PropsWithChildren<ButtonProps>) => {
  const { style, ...restTypo } = typographyProps;

  return (
    <MuiButton {...rest}>
      {startIcon}
      <Typography
        {...restTypo}
        style={{ height: 'calc(1em + 4px)', paddingInline: '0.5em', ...style }}
      >
        {children}
      </Typography>
      {endIcon}
    </MuiButton>
  );
};

export default Button;
