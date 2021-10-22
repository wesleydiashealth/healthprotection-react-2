import { StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#363636',
  },
  mainColor: {
    color: '#F8A034',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
  },
  mt40: {
    marginTop: 40,
  },
  section: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 16,
  },
  sectionTitleMt40: {
    marginTop: 40,
    fontSize: 16,
  },
  sectionSubtitle: {
    marginBottom: 10,
    fontSize: 12,
  },
  sectionLabel: {
    color: '#2B2560',
  },
  sectionLabelMt20: {
    marginTop: 20,
    color: '#2B2560',
  },
  sectionValue: {
    color: '#000',
  },
  header: {
    display: 'flex',
  },
  date: {
    marginBottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 200,
    backgroundColor: '#e5e5e5',
    fontSize: 12,
    lineHeight: 1,
  },
  intro: {
    maxWidth: 240,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  introIcon: {
    marginBottom: 60,
    width: 160,
    height: 'auto',
  },
  introTitle: {
    fontSize: 24,
  },
  introDesc: {
    marginBottom: 40,
    fontSize: 12,
    lineHeight: 1.5,
  },
  boxes: {
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 11,
  },
  boxesItem: {
    marginRight: 10,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    maxWidth: 180,
    backgroundColor: '#e5e5e5',
    textAlign: 'center',
  },
  featured: {
    fontSize: 14,
    lineHeight: 1.5,
  },
  step2: {},
  outcomes: {
    color: '#000',
  },
  outcome: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ccc',
  },
  outcomeSibling: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ccc',
  },
  outcomeTitle: {
    marginBottom: 5,

    fontSize: 12,
    lineHeight: 1,
  },
  suboutcomes: {
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  suboutcome: {},
  suboutcomeSibling: {
    marginTop: 10,
  },
  suboutcomeTitle: {
    marginBottom: 5,
    fontSize: 10,
    lineHeight: 1,
  },
  nutraceuticals: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    lineHeight: 1,
  },
  nutraceutical: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
  },
  nutraceuticalSibling: {
    marginLeft: 5,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
  },
  step1: {},
  answers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  answer: {
    marginBottom: 20,
    marginHorizontal: '1%',
    borderRadius: 16,
    padding: 10,
    width: '31.33%',
    display: 'flex',
    backgroundColor: '#fafafa',
    lineHeight: 1,
  },
  answerQuestion: {
    marginBottom: 5,
    fontSize: 10,
  },
  answerSubQuestion: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  answerAnswer: {
    marginVertical: 2.5,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#565656',
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
  },
  answerSubAnswer: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#565656',
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
  },
  answerExcludes: {
    marginTop: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#F15F63',
    color: '#fff',
    fontSize: 9,
  },
  answerExcludesTitle: {
    fontWeight: 600,
    marginBottom: 5,
  },
  answerExcludesValue: {},
  // outcome: {
  //   marginBottom: 20,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // outcomeIcon: {
  //   marginRight: 10,
  //   width: 32,
  // },
  habits: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  habit: {
    marginBottom: 20,
    marginHorizontal: '1%',
    borderRadius: 16,
    padding: 10,
    width: '48%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    lineHeight: 1,
  },
  habitIcon: {
    marginRight: 10,
    width: '64px',
    height: 'auto',
  },
  habitContent: {
    flex: 1,
  },
  habitTitle: {
    marginBottom: 10,
  },
  habitQuestion: {
    marginBottom: 5,
    fontSize: 10,
    lineHeight: 1.5,
  },
  habitFrequency: {
    marginVertical: 2.5,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#565656',
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
  },
});

export default styles;
