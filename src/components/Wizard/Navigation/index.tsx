import React from 'react';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import { ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';

import { useApp } from 'contexts/app';

import Container from './styles';

const Navigation: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  return (
    <Container>
      <ButtonBack>
        <>
          <HiOutlineArrowNarrowLeft size={20} />
          {labels.step_1_previous}
        </>
      </ButtonBack>
      <DotGroup showAsSelectedForCurrentSlideOnly />
      <ButtonNext>
        <>
          {labels.step_1_next}
          <HiOutlineArrowNarrowRight size={20} />
        </>
      </ButtonNext>
    </Container>
  );
};

export default Navigation;
