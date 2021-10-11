import { StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontSize: 12,
    lineHeight: 1.5,
  },
  mainColor: {
    color: '#F8A034',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  mt40: {
    marginTop: 40,
  },
  section: {
    flexGrow: 1,
  },
  sectionTitle: {
    color: '#F8A034',
    fontSize: 16,
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
    marginHorizontal: 'auto',
    padding: 10,
    maxWidth: 320,
    textAlign: 'center',
  },
  introIcon: {
    marginHorizontal: 'auto',
    marginBottom: 20,
    width: 60,
    height: 'auto',
  },
  introTitle: {
    marginBottom: 10,
    borderBottom: 1,
    borderColor: '#e5e5e5',
    color: '#2B2560',
    fontSize: 24,
  },
  introDesc: {
    marginBottom: 40,
    fontSize: 14,
  },
  boxes: {
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 11,
    textAlign: 'justify',
  },
  boxesItem: {
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#e5e5e5',
    maxWidth: '40%',
    textAlign: 'center',
  },
  featured: {
    marginBottom: 60,
    marginHorizontal: 'auto',
    maxWidth: '90%',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '2rem',
    color: '#2B2560',
  },
  answers: {},
  answersItem: {},
  answersItemQuestion: {
    marginTop: 20,
    color: '#2B2560',
  },
  answersItemAnswer: {
    color: '#000',
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
