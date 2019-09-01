import React, { FC } from 'react';
import { Loader, Placeholder } from 'semantic-ui-react';

interface LoadingProps {
  isInverted?: boolean;
}

const Loading: FC<LoadingProps> = ({ isInverted = false }) => (
  <Loader inline="centered" active inverted={isInverted} />
);

export default Loading;
