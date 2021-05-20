import React from 'react';
import {
  IoChatbubblesOutline,
  IoOptionsOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

import Container from './styles';

const Hero: React.FC = () => {
  const steps = [
    {
      icon: <IoChatbubblesOutline size={48} />,
      title: 'Step 1',
      description: 'Talk a little about yourself',
    },
    {
      icon: <IoOptionsOutline size={48} />,
      title: 'Step 2',
      description: 'Fine-tune your desired outcomes',
    },
    {
      icon: <IoShieldCheckmarkOutline size={48} />,
      title: 'Step 3',
      description: 'Check information and be secure',
    },
  ];

  return (
    <Container id="hero" className="hero">
      <div className="hero__column">
        <h1 className="hero__title">
          Get pure science-based dietary supplement <span>in 3 steps</span>
        </h1>
        <ul className="hero__list">
          {steps.map(step => (
            <li key={step.title} className="hero__list__item">
              {step.icon}
              <p>{step.title}</p>
              <p>{step.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="hero__column">
        <p>Image</p>
      </div>
    </Container>
  );
};

export default Hero;
