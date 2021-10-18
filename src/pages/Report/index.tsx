import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import ReportDocument from 'components/ReportDocument';

import answers from 'answers.json';
import excludes from 'excludes.json';
import outcomes from 'outcomes.json';
import suboutcomes from 'suboutcomes.json';
import habits from 'habits.json';
import selectedConnections from 'selectedConnections.json';

const Report: React.FC = () => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <ReportDocument
      {...{
        answers,
        outcomes,
        suboutcomes,
        selectedConnections,
        excludes,
        habits,
      }}
    />
  </PDFViewer>
);

export default Report;
