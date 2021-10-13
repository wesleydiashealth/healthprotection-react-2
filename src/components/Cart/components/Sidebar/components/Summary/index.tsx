import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

import { useApp } from 'contexts/app';

import Container, {
  Title,
  Details,
  Description,
  Shipping,
  CheckoutButton,
  SaveRecommendation,
} from './styles';

const Summary: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  return (
    <Container>
      <Title>
        <span>{labels.summary_total}</span> $50.68
      </Title>
      <Details>0.54/day</Details>
      <Description>{labels.summary_description}</Description>
      <Shipping>{labels.summary_shipping}</Shipping>
      <CheckoutButton>
        {labels.summary_button} <BsArrowRight size={18} />
      </CheckoutButton>
      <SaveRecommendation>
        {labels.summary_save_recommendation}
      </SaveRecommendation>
    </Container>
  );
};

export default Summary;
