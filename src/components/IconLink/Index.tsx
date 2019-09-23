import React from 'react';
import { IconButton, Icon, Tooltip, Typography } from '@material-ui/core';

interface Props {
  title: string;
  url: string;
  className: string;
}

export const IconLink: React.FC<Props> = ({ title, url, className }) => {
  return (
    <Tooltip title={title} aria-label={title}>
      <IconButton aria-label={title} href={url} target="_brank" rel="noopener">
        <Icon className={className} />
      </IconButton>
    </Tooltip>
  );
};
