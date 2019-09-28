import React, { FC, MouseEvent } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Icon, Theme, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginButtom: theme.spacing(1),
    },
    lowerCase: {
      textTransform: 'none',
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
  }),
);

interface Props {
  text: string;
  color: 'inherit' | 'primary' | 'secondary' | 'default';
  iconClassName: string;
  handleOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLeftIcon?: boolean;
  lowerCase?: boolean;
}

export const ButtonWithIcon: FC<Props> = ({
  handleOnClick,
  color,
  iconClassName,
  text,
  isLeftIcon = true,
  lowerCase = true,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color={color}
      className={clsx(classes.button, lowerCase ? classes.lowerCase : '')}
      onClick={handleOnClick}
    >
      {isLeftIcon && <Icon className={clsx(classes.leftIcon, iconClassName)} />}
      {!isLeftIcon && (
        <Icon className={clsx(classes.rightIcon, iconClassName)} />
      )}
      {text}
    </Button>
  );
};
