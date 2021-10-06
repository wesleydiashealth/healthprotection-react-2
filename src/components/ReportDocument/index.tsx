/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Page, Text, Link, Image, View, Document } from '@react-pdf/renderer';

// import { useApp } from 'contexts/app';

import foods from 'foods.json';
import outcomes from 'outcomes.json';
import suboutcomes from 'suboutcomes.json';

import styles from './styles';

// Create Document Component
const ReportDocument: React.FC = () => {
  // const context = useApp();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.date}>test performed on: 10/05/2021</Text>
        </View>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Personalized for you</Text>
          <Text style={styles.introDesc}>
            We are glad you are taking care of yourself and we are here to
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
            <Text style={styles.mainColor}>Health Protection</Text> supplements
            there are a few things you will need to know and note.
          </Text>
        </View>
        <View style={styles.answers}>
          <Text style={styles.sectionTitle}>Your answers in Step 1</Text>
          <Text style={styles.sectionLabel}>
            Age: <Text style={styles.sectionValue}>18-30</Text>
          </Text>
          <Text style={styles.sectionLabel}>
            Gender: <Text style={styles.sectionValue}>Female</Text>
          </Text>
          <Text style={styles.sectionLabel}>
            Diet: <Text style={styles.sectionValue}>None</Text>
          </Text>
          <Text style={styles.sectionLabel}>
            Allergies: <Text style={styles.sectionValue}>Peanuts</Text>
          </Text>
          <Text style={styles.sectionLabel}>
            Medications: <Text style={styles.sectionValue}>None</Text>
          </Text>
        </View>
        <View style={styles.excludes}>
          <Text style={styles.sectionTitleMt40}>
            What we exclude in this step
          </Text>
          <Text style={styles.sectionValue}>Maca</Text>
          <Text style={styles.sectionValue}>Ashwagandha</Text>
          <Text style={styles.sectionValue}>Vitamin B12</Text>
        </View>
        <View style={styles.Outcomes} break>
          <Text style={styles.sectionTitle}>
            Your desire outcomes in Step 2
          </Text>
          {outcomes.map(outcome => (
            <View style={styles.outcome}>
              <Image style={styles.outcomeIcon} src={outcome.icon} />
              <Text style={styles.outcomeTitle}>{outcome.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.subOutcomes}>
          <Text style={styles.sectionTitleMt40}>
            Your desire sub-outcomes in Step 2
          </Text>
          {suboutcomes.map(suboutcome => (
            <View style={styles.suboutcome}>
              <Text style={styles.suboutcomeTitle}>{suboutcome.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.eatingHabits}>
          <Text style={styles.sectionTitleMt40}>
            About your eating habits in Step 3
          </Text>
          {foods.map(food => (
            <View style={styles.food}>
              <Image style={styles.foodIcon} src={food.icon} />
              <View style={styles.foodContent}>
                <Text style={styles.foodTitle}>{food.title}: </Text>
                <Text style={styles.foodFrequency}>Once a week</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.excludes}>
          <Text style={styles.sectionTitleMt40}>
            What we exclude in this step
          </Text>
          <Text style={styles.sectionLabel}>
            Through your eating habits and areas you want to take care of, our
            scientific base along with our AI has ruled out the following
            nutraceuticals:
          </Text>
          <Text style={styles.sectionValue}>Reishi</Text>
          <Text style={styles.sectionValue}>Ômega 3</Text>
        </View>
        <View>
          <Text style={styles.sectionTitleMt40}>Your result</Text>
          <Text style={styles.sectionLabel}>
            Each pack contains 30-day capsules. Check which nutraceuticals can
            help you and the recommended daily dose.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocument;
