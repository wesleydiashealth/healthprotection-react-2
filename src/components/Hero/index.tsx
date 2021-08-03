import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { GiMicroscope } from 'react-icons/gi';
import { ImPlay } from 'react-icons/im';

import Container, { HeroContent, HeroImage } from './styles';
import heroImg from '../../assets/header_hero.svg';

const Hero: React.FC = () => {
  const steps = [
    {
      icon: <ImPlay size={90} color="#DB71AF" />,
      title: 'Watch the Video',
    },
    {
      icon: <GiMicroscope size={90} color="#DB71AF" />,
      title: 'The Science behind us',
    },
    {
      icon: <FaExclamationCircle size={90} color="#DB71AF" />,
      title: 'Our Solid Foundation',
    },
  ];

  return (
    <Container id="hero">
      <HeroContent>
        <div className="content-wrapper">
          <h1>Deep level personalization</h1>
          <h2>
            A new approach to understand your nutritional needs through science,
            true Artificial Intelligence and top-level products.
          </h2>
          <p>Try now by taking 3 quick steps</p>
          <a href="#step_1">Go to Step 1</a>
        </div>
        <div className="hero-list">
          <div className="content-wrapper">
            <ul>
              {steps.map(step => (
                <React.Fragment key={step.title}>
                  <li>
                    {step.icon}
                    <strong>{step.title}</strong>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </HeroContent>
      <HeroImage>
        <img src={heroImg} alt="" />
      </HeroImage>
    </Container>
  );
};

export default Hero;
