import React from 'react';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import { ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';

import Container from './styles';

const Navigation: React.FC = () => {
  return (
    <Container>
      <ButtonBack>
        <>
          <HiOutlineArrowNarrowLeft size={20} />
          Prev
        </>
      </ButtonBack>
      <DotGroup showAsSelectedForCurrentSlideOnly />
      <ButtonNext>
        <>
          Next
          <HiOutlineArrowNarrowRight size={20} />
        </>
      </ButtonNext>
    </Container>
  );
};

export default Navigation;
