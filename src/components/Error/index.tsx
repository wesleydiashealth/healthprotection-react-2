import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Container from './styles';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Container>
      <MdErrorOutline size={48} color="#dd4949" />
      <span>{message}</span>
    </Container>
  );
};

export default Error;
