import React from 'react';
import ReactLoading from 'react-loading';

import Container from './styles';

interface LoadingProps {
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ color = '#565656' }) => {
  return (
    <Container>
      <ReactLoading type="spinningBubbles" color={color} />
    </Container>
  );
};

export default Loading;
