import React from 'react';

import { useWizard } from '../../../contexts/wizard';

import Loading from '../../Loading';

const Carousel: React.FC = ({ children }) => {
  const context = useWizard();
  const { questions } = context;

  return Object.keys(questions).length > 1 ? (
    <>{children}</>
  ) : (
    <Loading color="#7664c8" />
  );
};

export default Carousel;
