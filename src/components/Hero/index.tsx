import React from 'react';
import {
  IoChatbubblesOutline,
  IoOptionsOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { HiOutlineArrowNarrowDown } from 'react-icons/hi';
import { BsChevronCompactRight } from 'react-icons/bs';

import Container, { HeroContent, HeroImage } from './styles';
import heroImg from '../../assets/hero_image.png';

const Hero: React.FC = () => {
  const steps = [
    {
      icon: <IoChatbubblesOutline size={52} color="#7664C8" />,
      title: 'Step 1',
      description: 'Talk a little about yourself',
    },
    {
      icon: <IoOptionsOutline size={52} color="#DB71AF" />,
      title: 'Step 2',
      description: 'Fine-tune your desired outcomes',
    },
    {
      icon: <IoShieldCheckmarkOutline size={52} color="#1BC9BD" />,
      title: 'Step 3',
      description: 'Check information and be secure',
    },
  ];

  return (
    <Container id="hero">
      <HeroContent>
        <div className="content-wrapper">
          <h1>
            Get pure science-based dietary supplement <span>in 3 steps</span>
          </h1>
        </div>
        <div className="hero-list">
          <div className="content-wrapper">
            <ul>
              {steps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <li>
                    {step.icon}
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </li>
                  {index < steps.length - 1 && (
                    <BsChevronCompactRight size={92} color="#EFEFEF" />
                  )}
                </React.Fragment>
              ))}
            </ul>
            <div className="start-now">
              <a href="#step_1">
                Start <strong>now</strong>
              </a>
              <HiOutlineArrowNarrowDown size={36} color="#707070" />
            </div>
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
