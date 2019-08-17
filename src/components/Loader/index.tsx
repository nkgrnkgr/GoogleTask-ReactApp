import React, { FC } from 'react';
import { Loader } from 'semantic-ui-react';

interface LoadingProps {
  isInverted?: boolean;
}

const Loading: FC<LoadingProps> = ({ isInverted = true }) => (
  <Loader inline="centered" active inverted={isInverted} />
);

export default Loading;
