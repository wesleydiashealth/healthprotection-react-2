import React, { useContext, useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
import Button from 'components/Button';

import AnswerData from 'dtos/AnswerData';

import {
  StepContainer,
  QuestionPrefix,
  QuestionTitle,
  QuestionSuffix,
} from '../styles';

const Step9: React.FC = () => {
  const appContext = useApp();
  const { labels, answers, updateAnswers } = appContext;

  const wizardContext = useWizard();
  const { steps, questions, updateStep } = wizardContext;
  const { step7: step, step6: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 11,
  );

  const [stepNumber] = useState<string>('7');
  const [stepTitle] = useState<string>(currentQuestion?.label || '');

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleInputChange = useCallback(
    answer => {
      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        item => item.question.slug === currentQuestion?.slug,
      );

      updateStep('step7', {
        index: 7,
        isCompleted: true,
        isExcluded: !!answer.exclude,
        excludeMessage: answer.exclude,
        answers: answer.slug || '',
      });

      if (answerIndex > -1) {
        updatedAnswers[answerIndex] = {
          question: {
            slug: currentQuestion?.slug || '',
            label: currentQuestion?.label || '',
          },
          answer: {
            slug: answer.slug,
            label: answer.label,
          },
        };

        updateAnswers(updatedAnswers);
      } else {
        updateAnswers([
          ...answers,
          {
            question: {
              slug: currentQuestion?.slug || '',
              label: currentQuestion?.label || '',
            },
            answer: {
              slug: answer.slug,
              label: answer.label,
            },
          },
        ]);
      }

      setStoreState({ currentSlide: 7 });
    },
    [answers, currentQuestion, setStoreState, updateStep, updateAnswers],
  );

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={
        !previousStep.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 6
      }
    >
      {step?.answers.length > 0 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>
        {`${labels.step_1_question} ${stepNumber}/${wizardSteps}`}
      </QuestionPrefix>
      <QuestionTitle>{stepTitle}</QuestionTitle>
      <QuestionSuffix
        data-tip={`<span>${currentQuestion?.description}</span>`}
        data-for="step_7_tooltip"
      >
        {labels.step_1_question_tooltip}
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664c8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_7_tooltip"
      /> */}
      <ReactToolTip
        id="step_7_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentQuestion?.answers &&
          Object.values(currentQuestion.answers).map(answer => (
            <Button
              key={answer.id}
              type="submit"
              onClick={() => {
                handleInputChange(answer);
              }}
              isActive={step?.answers === answer.slug}
              name={currentQuestion.table}
              value={step?.answers}
            >
              {answer.label}
            </Button>
          ))}
      </ScrollArea>
    </StepContainer>
  );
};

export default Step9;
