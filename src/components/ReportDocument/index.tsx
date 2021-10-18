/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Page,
  Text,
  Link,
  Image,
  View,
  Document,
  Font,
} from '@react-pdf/renderer';

import AnswerData from 'dtos/AnswerData';
import ExcludeData from 'dtos/ExcludesData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import HabitData from 'dtos/HabitData';

import styles from './styles';

Font.registerHyphenationCallback(word => [word]);

interface ReportDocumentData {
  answers: AnswerData[];
  outcomes: OutcomeData[];
  suboutcomes: SuboutcomeData[];
  selectedConnections: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  excludes: ExcludeData;
  habits: HabitData[];
}

// Create Document Component
const ReportDocument: React.FC<ReportDocumentData> = ({
  answers,
  outcomes,
  suboutcomes,
  selectedConnections,
  excludes,
  habits,
}) => {
  // const today = new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.header}>
          <Text style={styles.date}>
            test performed on:{' '}
            {`${today.getDate()}/${
              today.getMonth() + 1
            }/${today.getFullYear()}`}
          </Text>
        </View> */}
        <View style={styles.intro}>
          <Image
            style={styles.introIcon}
            src="/images/healthprotection_retina.png"
          />
          <Text style={styles.introTitle}>Personalized for you</Text>
          <Text style={styles.introDesc}>
            Hi! We are glad you are taking care of yourself and we are here to
            support you.
          </Text>
        </View>
        <View style={styles.boxes}>
          <Text style={styles.boxesItem}>
            If you have questions or need more information about your
            recommendation, please contact{' '}
            <Link style={styles.link} src="tel:+154855778877">
              +154 855 77 88 77
            </Link>
          </Text>
          <Text style={styles.boxesItem}>
            Feel free to access{' '}
            <Link style={styles.link} src="https://www.healthprotection.com/">
              healthprotection.com
            </Link>{' '}
            for more information about all of our products and scientific
            researches.
          </Text>
        </View>
        <View style={styles.featured}>
          <Text>
            So now that you have chosen your{' '}
            <Text style={styles.bold}>Health Protection</Text> supplements there
            are a few things you will need to know and note.
          </Text>
        </View>

        <View style={styles.step2} break>
          <Text style={styles.sectionTitle}>
            Your desire outcomes and sub-outcomes in Step 2
          </Text>

          <View style={styles.sankey}>
            <View style={styles.sankeyOutcomes}>
              {outcomes
                .filter(outcome =>
                  Object.keys(selectedConnections).includes(outcome.id),
                )
                .map(outcome => {
                  return <Text>{outcome.title}</Text>;
                })}
            </View>

            <View style={styles.sankeySubOutcomes}>
              {suboutcomes
                .filter(suboutcome =>
                  Object.values(selectedConnections).reduce(
                    (acc: boolean, curr) =>
                      Object.keys(curr).includes(suboutcome.id)
                        ? !!Object.keys(curr).includes(suboutcome.id)
                        : acc,
                    false,
                  ),
                )
                .map(suboutcome => {
                  return <Text>{suboutcome.title}</Text>;
                })}
            </View>
          </View>
        </View>

        <View style={styles.step1} break>
          <Text style={styles.sectionTitle}>Your answers in Step 1</Text>
          <Text style={styles.sectionSubtitle}>
            Show on the red box if excludes outcomes, sub-outcomes and
            netraceuticals
          </Text>
          <View style={styles.answers}>
            {answers.map(answer => {
              const answerExcludes = Object.entries(excludes).filter(
                ({ 0: exclude }) => exclude === answer.question.slug,
              );

              return (
                <View key={answer.question.slug} style={styles.answer}>
                  <Text style={styles.answerQuestion}>
                    {answer.question.label.charAt(0).toUpperCase() +
                      answer.question.label.slice(1)}
                  </Text>
                  <View>
                    {answer.answer.label.split(', ').map(item => (
                      <Text style={styles.answerAnswer}>{item}</Text>
                    ))}
                  </View>
                  {!!answer.subAnswer && (
                    <View>
                      {answer.subAnswer.map(item => (
                        <View key={item.answer.slug}>
                          <Text
                            style={styles.answerSubQuestion}
                          >{`${item.question.label}:`}</Text>
                          <Text style={styles.answerSubAnswer}>
                            {item.answer.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {!!answerExcludes.length && (
                    <View style={styles.answerExcludes}>
                      <Text style={styles.answerExcludesTitle}>
                        What we exclude in this answer:
                      </Text>
                      {answerExcludes.map(({ 1: exclude }) =>
                        exclude.map(value => (
                          <Text
                            key={value.slug}
                            style={styles.answerExcludesValue}
                          >
                            {value.label}
                          </Text>
                        )),
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* <View style={styles.excludes}>
          <Text style={styles.sectionTitleMt40}>
            What we exclude in this step
          </Text>

          <Text style={styles.sectionLabel}>Outcomes:</Text>
          {excludedOutcomes.length ? (
            excludedOutcomes.map(excludedOutcome => (
              <Text
                key={excludedOutcome.question.slug}
                style={styles.sectionValue}
              >
                {excludedOutcome.question.label}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}

          <Text style={styles.sectionLabelMt20}>Sub-Outcomes:</Text>
          {excludedSuboutcomes.length ? (
            excludedSuboutcomes.map(excludedSuboutcome => (
              <Text
                key={excludedSuboutcome.question.slug}
                style={styles.sectionValue}
              >
                {`${excludedSuboutcome.question.label} (${
                  excludedSuboutcome.answer.label
                }): ${excludedSuboutcome.exclude.join(', ')}`}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}

          <Text style={styles.sectionLabelMt20}>Nutraceuticals:</Text>
          {excludedNutraceuticals.length ? (
            excludedNutraceuticals.map(excludedNutraceutical => (
              <Text
                key={excludedNutraceutical.medication.slug}
                style={styles.sectionValue}
              >
                {`${
                  excludedNutraceutical.medication.title
                }: ${excludedNutraceutical.medication.exclude.join(', ')}`}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}
        </View> */}
        {/* <View style={styles.Outcomes} break>
          <Text style={styles.sectionTitle}>
            Your desire outcomes in Step 2
          </Text>
          {outcomes.map(outcome => (
            <View key={outcome.id} style={styles.outcome}>
              <Image
                style={styles.outcomeIcon}
                src={`/icons/outcomes/${outcome.id}.jpg`}
              />
              <Text style={styles.outcomeTitle}>{outcome.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.subOutcomes}>
          <Text style={styles.sectionTitleMt40}>
            Your desire sub-outcomes in Step 2
          </Text>
          {suboutcomes.map(suboutcome => (
            <View key={suboutcome.id} style={styles.suboutcome}>
              <Text style={styles.suboutcomeTitle}>{suboutcome.title}</Text>
            </View>
          ))}
        </View> */}
        <View style={styles.step3}>
          <Text style={styles.sectionTitleMt40}>
            About your eating habits in Step 3
          </Text>
          <View style={styles.habits}>
            {habits.map(habit => (
              <View key={habit.food} style={styles.habit}>
                <Image style={styles.habitIcon} src={habit.icon} />
                <View style={styles.habitContent}>
                  <Text style={styles.habitTitle}>{habit.food}</Text>
                  <Text style={styles.habitQuestion}>
                    How many {habit.unit} do you consume per week?
                  </Text>
                  <Text style={styles.habitFrequency}>{habit.frequency}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocument;
