import React, { useCallback, useRef } from 'react';
import ReactToolTip from 'react-tooltip';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import * as Yup from 'yup';
import { IoChatbubblesOutline } from 'react-icons/io5';

import getValidationErrors from '../../utils/getValidationErrors';

import Container, { SliderNavigation } from './styles';
import 'react-multi-carousel/lib/styles.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { WizardProvider } from '../../contexts/wizard';
import Carousel from './Carousel';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';

const Wizard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: HTMLFormElement) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        age: Yup.string().required('Idade obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container id="step_1">
      <div className="step-intro content-wrapper">
        <IoChatbubblesOutline size={52} color="#7664C8" />
        <h2>
          Step 1
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color="#7664C8"
            data-tip="<strong>Step 2</strong><span>We already made a pre-selection...</span>"
            data-for="wizard-title-tooltip"
          />
          <ReactToolTip
            id="wizard-title-tooltip"
            className="wizard-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </h2>
        <h3>
          <strong>Start</strong> by talking a little about yourself
        </h3>
        <span>
          Doing this step is critical to narrow down all more than 500 products,
          17 possible outcomes and 43 sub-outcomes.
        </span>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} className="content-wrapper">
        <WizardProvider>
          <Carousel>
            <CarouselProvider
              naturalSlideWidth={400}
              naturalSlideHeight={800}
              totalSlides={8}
              visibleSlides={1}
              step={1}
            >
              <Slider>
                <Slide index={1}>
                  <Step1 />
                </Slide>
                <Slide index={2}>
                  <Step2 />
                </Slide>
                <Slide index={3}>
                  <Step3 />
                </Slide>
                <Slide index={4}>
                  <Step4 />
                </Slide>
                <Slide index={5}>
                  <Step5 />
                </Slide>
                <Slide index={6}>
                  <Step6 />
                </Slide>
                <Slide index={7}>
                  <Step7 />
                </Slide>
                <Slide index={8}>
                  <Step8 />
                </Slide>
              </Slider>
              <SliderNavigation>
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
              </SliderNavigation>
            </CarouselProvider>
          </Carousel>
        </WizardProvider>
      </Form>
    </Container>
  );
};

export default Wizard;
