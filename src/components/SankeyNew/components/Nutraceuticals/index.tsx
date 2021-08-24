import React from 'react';
import ReactToolTip from 'react-tooltip';
import { FiRefreshCcw } from 'react-icons/fi';

import Nutraceutical from './components/Nutraceutical';

import Container from './styles';

import { useSankey } from '../../../../contexts/sankey';

import sankeyData from '../../../../sankey-new.json';

const Nutraceuticals: React.FC = () => {
  const context = useSankey();
  const { connections } = context;

  const { nutraceuticals } = sankeyData;

  return (
    <Container>
      {Object.entries(connections).map(subconnections => {
        const { 1: suboutcomes } = subconnections;

        return Object.entries(suboutcomes).map(subconnection => {
          const { 1: nutraceuticalKeys } = subconnection;

          return (
            Array.isArray(nutraceuticalKeys) &&
            nutraceuticalKeys.map(nutraceuticalKey => {
              const nutraceutical = Object.values(nutraceuticals).find(
                item => item.id === nutraceuticalKey,
              );

              return (
                nutraceutical && (
                  <Nutraceutical key={nutraceutical.id}>
                    <div>
                      <strong>{nutraceutical.title}</strong>
                      <span>{`${nutraceutical.dosage} ${nutraceutical.unit}`}</span>
                    </div>
                    <FiRefreshCcw
                      className="refresh-icon"
                      size={20}
                      color="#000"
                      data-tip={`${nutraceutical.title}`}
                      data-for={`sankey-${nutraceutical.id}-refresh`}
                    />
                    <ReactToolTip
                      id={`sankey-${nutraceutical.id}-refresh`}
                      className={`sankey-${nutraceutical.id}-refresh`}
                      place="bottom"
                      type="light"
                      effect="solid"
                      offset={{ top: 10, left: 10 }}
                      html
                      backgroundColor="#000"
                    />
                  </Nutraceutical>
                )
              );
            })
          );
        });
      })}
    </Container>
  );
};

export default Nutraceuticals;
