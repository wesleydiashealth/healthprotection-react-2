import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { GiMicroscope } from 'react-icons/gi';
import { ImPlay } from 'react-icons/im';
import Popup from 'reactjs-popup';

import heroImg from 'assets/header_hero.svg';
import Container, {
  HeroIntro,
  HeroMainTitle,
  HeroSubTitle,
  HeroDescription,
  HeroButton,
  HeroImage,
  HeroList,
  HeroListItem,
  HeroListItemLink,
  HeroListItemText,
  HeroListItemPopupContent,
} from './styles';

const Hero: React.FC = () => {
  const steps = [
    {
      id: 'video',
      icon: <ImPlay size={32} color="#DB71AF" />,
      link: 'https://www.youtube.com/embed/Hv_T8qPqRnA',
      modal: true,
      title: 'Watch the Video',
    },
    {
      id: 'science',
      icon: <GiMicroscope size={32} color="#DB71AF" />,
      link: 'https://www.healthprotection.com/the-science-behind-us/',
      modal: false,
      title: 'The Science behind us',
    },
    {
      id: 'foundation',
      icon: <FaExclamationCircle size={32} color="#DB71AF" />,
      link: 'https://www.healthprotection.com/our-solid-foundation/',
      modal: true,
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
          <React.Fragment key={step.id}>
            {step.modal ? (
              <Popup
                trigger={
                  <HeroListItem>
                    {step.icon}
                    <HeroListItemText>{step.title}</HeroListItemText>
                  </HeroListItem>
                }
                modal
                nested
              >
                <HeroListItemPopupContent>
                  <iframe
                    width="560"
                    height="315"
                    src={step.link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </HeroListItemPopupContent>
              </Popup>
            ) : (
              <HeroListItem>
                {step.icon}
                <HeroListItemLink href={step.link}>
                  {step.title}
                </HeroListItemLink>
              </HeroListItem>
            )}
          </React.Fragment>
        ))}
      </HeroList>
    </Container>
  );
};

export default Hero;
