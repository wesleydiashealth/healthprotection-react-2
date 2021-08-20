import React, { useState, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

interface BloodTestData {
  [key: string]: string;
}

const Step7: React.FC = () => {
  const currentStep = formSteps[1];

  const context = useWizard();
  const { steps, questions } = context;
  const { step7: step, step7_1: subStep, step6: previousStep } = steps;
  const { 14: currentQuestion } = questions || {};

  // const subSteps = [steps.step6_1, steps.step6_2, steps.step6_3, steps.step6_4];

  // const subStepsCompleted = !!subSteps.filter(item => !!item.isCompleted)
  //   .length;

  const gambiarra = {
    '1': {
      id: 1,
      api: 'redbloodcells',
      label: 'Red Blood Cells',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '2': {
      id: 2,
      api: 'hemoglobin',
      label: 'Hemoglobin',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '3': {
      id: 3,
      api: 'hematocrit',
      label: 'Hematocrit',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '4': {
      id: 4,
      api: 'mcv',
      label: 'MCV',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '5': {
      id: 5,
      api: 'mchc',
      label: 'MCHC',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '6': {
      id: 6,
      api: 'rdw',
      label: 'RDW',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '7': {
      id: 7,
      api: 'leukocytes',
      label: 'Leukocytes',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '8': {
      id: 8,
      api: 'neurotrophils',
      label: 'Neurotrophils',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '9': {
      id: 9,
      api: 'eosinophils',
      label: 'Eosinophils',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '10': {
      id: 10,
      api: 'monocytes',
      label: 'Monocytes',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '11': {
      id: 11,
      api: 'lymphocytes',
      label: 'Lymphocytes',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '12': {
      id: 12,
      api: 'platelets',
      label: 'Platelets',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '13': {
      id: 13,
      api: 'glucose',
      label: 'Glucose',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '14': {
      id: 14,
      api: 'cholesterol',
      label: 'Cholesterol',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '15': {
      id: 15,
      api: 'creatinine',
      label: 'Creatinine',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '16': {
      id: 16,
      api: 'tsh',
      label: 'TSH',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '17': {
      id: 17,
      api: 'freethyroxine',
      label: 'Free Thyroxine',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '18': {
      id: 18,
      api: 'testosterone',
      label: 'Total Testosterone',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
    '19': {
      id: 19,
      api: 'SDHEA',
      label: 'SDHEA',
      type: 'S',
      has_child: false,
      slug: 'bloodtest',
    },
  };

  const [bloodTestData, setBloodTestData] = useState<BloodTestData>({});

  const [stepNumber, setStepNumber] = useState<string>('7');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return (
    <StepContainer
      isCompleted={step?.isCompleted || subStep?.isCompleted}
      isDisabled={!previousStep?.isCompleted}
    >
      {(step?.isCompleted || subStep?.isCompleted) && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {stepNumber}/{wizardSteps}
      </span>
      <strong>{stepTitle}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          step?.answers !== 'yes'
            ? currentQuestion?.label
            : currentStep.substep?.title
        }</strong><span>${
          step?.answers !== 'yes'
            ? currentQuestion?.label
            : currentStep.substep?.tooltip
        }</span>`}
        data-for="step_7_tooltip"
      />
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
      {step?.answers !== 'yes' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="button"
            onClick={() => {
              context.updateStep('step7', {
                isCompleted: answer.api !== 'yes',
                answers: answer.api,
              });
              if (answer.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 7 });
              } else {
                setStepNumber('7.1');
                setStepTitle('Select below which one you use:');
              }
            }}
            isActive={step?.answers === answer.api}
            name="gender"
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))}
      {step?.answers === 'yes' && currentQuestion?.answers && (
        <ScrollArea className="inputs-list" smoothScrolling horizontal={false}>
          {
            // Object.values(currentQuestion.answers)
            Object.values(gambiarra).map(option => {
              return (
                <label key={option.api} htmlFor={`bloodtest-${option.api}`}>
                  {option.label}
                  <input
                    type="text"
                    name={`bloodtest-${option.api}`}
                    id={`bloodtest-${option.api}`}
                    className="input-text"
                    value={bloodTestData[option.api] || ''}
                    maxLength={4}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setBloodTestData({
                        ...bloodTestData,
                        [option.api]: event.currentTarget.value.replace(
                          /\D/,
                          '',
                        ),
                      });
                    }}
                  />
                </label>
              );
            })
          }
        </ScrollArea>
      )}
      {step?.answers === 'yes' &&
        !!Object.values(bloodTestData).filter(data => !!data.length).length && (
          <button
            type="button"
            className="advance-button"
            onClick={() => {
              context.updateStep('step7', {
                isCompleted: true,
                answers: step?.answers,
              });
              carouselContext.setStoreState({ currentSlide: 7 });
            }}
          >
            Next Question
          </button>
        )}
    </StepContainer>
  );
};

export default Step7;
