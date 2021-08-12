import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { GiMicroscope } from 'react-icons/gi';
import { ImPlay } from 'react-icons/im';

import Container, {
  HeroIntro,
  HeroMainTitle,
  HeroSubTitle,
  HeroDescription,
  HeroButton,
  HeroImage,
  HeroList,
} from './styles';
import heroImg from '../../assets/header_hero.svg';

const Hero: React.FC = () => {
  const steps = [
    {
      icon: <ImPlay size={32} color="#DB71AF" />,
      link: '#1',
      title: 'Watch the Video',
    },
    {
      icon: <GiMicroscope size={32} color="#DB71AF" />,
      link: '#2',
      title: 'The Science behind us',
    },
    {
      icon: <FaExclamationCircle size={32} color="#DB71AF" />,
      link: '#3',
      title: 'Our Solid Foundation',
    },
  ];

  return (
    <Container id="hero">
      <HeroIntro>
        <HeroMainTitle>Deep level personalization</HeroMainTitle>
        <HeroSubTitle>
          A new approach to understand your nutritional needs through science,
          true Artificial Intelligence and top-level products.
        </HeroSubTitle>
        <HeroDescription>Try now by taking 3 quick steps</HeroDescription>
        <HeroButton className="button" href="#step_1">
          Go to Step 1
        </HeroButton>
      </HeroIntro>

      <HeroImage src={heroImg} alt="" />
      <HeroList>
        {steps.map(step => (
          <React.Fragment key={step.title}>
            <li>
              {step.icon}
              <a href={step.link}>{step.title}</a>
            </li>
          </React.Fragment>
        ))}
      </HeroList>
    </Container>
  );
};

export default Hero;
