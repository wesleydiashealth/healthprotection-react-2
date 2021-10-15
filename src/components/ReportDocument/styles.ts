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
  sectionSubtitle: {
    fontSize: 12,
  },
  sectionTitleMt40: {
    marginTop: 40,
    marginBottom: 10,
    color: '#F8A034',
    fontSize: 16,
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
  step1: {},
  answers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  answersItem: {
    marginBottom: 20,
    marginHorizontal: '2%',
    borderRadius: 16,
    padding: 16,
    width: '29.33%',
    display: 'flex',
    backgroundColor: '#ccc',
  },
  answersItemQuestion: {},
  answersItemAnswer: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#565656',
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 1,
  },
  outcome: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeIcon: {
    marginRight: 10,
    width: 32,
  },
  habit: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    marginRight: 10,
    width: 48,
  },
  habitContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
