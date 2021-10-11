import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import ReportDocument from 'components/ReportDocument';

import answers from 'answers.json';
import excludes from 'excludes.json';
import habits from 'habits.json';
import outcomes from 'outcomes.json';
import suboutcomes from 'suboutcomes.json';

const Report: React.FC = () => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <ReportDocument {...{ answers, excludes, outcomes, suboutcomes, habits }} />
  </PDFViewer>
);

export default Report;
