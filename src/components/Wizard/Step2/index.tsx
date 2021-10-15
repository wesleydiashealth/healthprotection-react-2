import React, { useState, useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';

import Button from 'components/Button';
import Input from 'components/Input';

import AnswerData from 'dtos/AnswerData';

import {
  StepContainer,
  QuestionPrefix,
  QuestionTitle,
  QuestionSuffix,
} from '../styles';

const Step2: React.FC = () => {
  const appContext = useApp();
  const { answers, updateAnswers } = appContext;

  const wizardContext = useWizard();
  const { steps, questions, updateStep } = wizardContext;
  const { step2: step, step2_1: subStep, step1: previousStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 2);

  const [stepNumber, setStepNumber] = useState<string>('2');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleQuestionInput = useCallback(
    answer => {
      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        item => item.question.slug === currentQuestion?.slug,
      );

      updateStep('step2', {
        index: 2,
        isCompleted: answer.api !== 'female',
        answers: answer.api,
        subAnswers: answer?.answers,
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

      if (answer.api !== 'female') {
        carouselContext.setStoreState({ currentSlide: 2 });
      } else {
        setStepNumber('2.1');
        setStepTitle('Are you:');
      }
    },
    [carouselContext, currentQuestion, answers, updateAnswers, updateStep],
  );

  const handleSubquestionInput = useCallback(
    (subAnswer, updatedStep: string, subQuestion: string) => {
      const updatedAnswers: AnswerData[] = answers.map(item =>
        item.question.slug === currentQuestion?.slug
          ? {
              ...item,
              subAnswer: [
                {
                  question: { slug: subQuestion, label: subQuestion },
                  answer: { slug: subAnswer.slug, label: subAnswer.label },
                },
              ],
            }
          : item,
      );

      updateAnswers(updatedAnswers);

      updateStep('step2', {
        index: 2,
        isCompleted: step.isCompleted,
        isExcluded: !!subAnswer?.exclude,
        excludeMessage: subAnswer?.exclude,
        answers: step.answers,
        subAnswers: step.subAnswers,
      });

      updateStep(updatedStep, {
        index: 2,
        isCompleted: true,
        answers: subAnswer.slug || '',
      });
      carouselContext.setStoreState({ currentSlide: 2 });
    },
    [
      carouselContext,
      currentQuestion,
      answers,
      step,
      updateAnswers,
      updateStep,
    ],
  );

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted || subStep?.isCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 1
      }
    >
      {(step?.isCompleted || subStep?.isCompleted) && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>
        Question {stepNumber}/{wizardSteps}
        {(step.isCompleted || !!step.answers.length) && (
          <FaUndoAlt
            size={16}
            color="#7664c8"
            onClick={() => {
              carouselContext.setStoreState({ currentSlide: 1 });
              setStepNumber('2');
              setStepTitle(currentQuestion?.label);
              updateStep('step2', {
                index: 2,
                isCompleted: false,
                answers: [],
              });
              updateStep('step2_1', {
                index: 2,
                isCompleted: false,
                answers: [],
              });
            }}
          />
        )}
      </QuestionPrefix>
      <QuestionTitle>{stepTitle}</QuestionTitle>
      <QuestionSuffix
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.description}</span>`}
        data-for="step_2_tooltip"
      >
        Why are we asking?
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          step?.answers !== 'female' ? currentQuestion?.label : stepTitle
        }</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_2_tooltip"
      /> */}
      <ReactToolTip
        id="step_2_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {!step.subAnswers ? (
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              handleQuestionInput(answer);
            }}
            isActive={step?.answers === answer.api}
            name={currentQuestion.table}
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))
      ) : (
        <>
          <Input
            type="hidden"
            name={currentQuestion.table}
            value={step?.answers}
          />
          {step.subAnswers.map(subAnswer => (
            <Button
              key={subAnswer.slug}
              type="submit"
              onClick={() => {
                handleSubquestionInput(
                  subAnswer,
                  'step2_1',
                  subAnswer.label || '',
                );
              }}
              isActive={subStep?.answers === subAnswer.slug}
              name="female_condition"
              value={subAnswer.api}
            >
              {subAnswer.label}
            </Button>
          ))}
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step2;
