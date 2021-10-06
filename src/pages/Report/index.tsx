import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import ReportDocument from 'components/ReportDocument';

const Report: React.FC = () => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <ReportDocument />
  </PDFViewer>
);

export default Report;
