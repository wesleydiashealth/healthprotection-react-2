import React from 'react';

import InteractionData from 'dtos/InteractionData';

import Container, {
  ContainerTitle,
  ContainerDosage,
  ContainerInteractions,
  ContainerInteractionsLabel,
  ContainerInteractionsItem,
  ContainerInteractionsItemName,
  ContainerInteractionsItemDosage,
  ContainerSources,
  ContainerSourcesItem,
} from './styles';

interface TooltipProps {
  title: string;
  dosages: string;
  interactions?: InteractionData[];
  dataSource?: string[];
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  dosages,
  interactions,
  dataSource,
}) => {
  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ContainerDosage>{dosages}</ContainerDosage>
      <ContainerInteractions>
        <ContainerInteractionsLabel>
          {`The follow table considers 100 grams of ${title.toLowerCase()}:`}
        </ContainerInteractionsLabel>
        {interactions?.map(interaction => (
          <ContainerInteractionsItem key={interaction.nutraceuticalSlug}>
            <ContainerInteractionsItemName>
              {interaction.nutraceutical}
            </ContainerInteractionsItemName>
            <ContainerInteractionsItemDosage>
              {interaction.dosage}
              {interaction.dosageUnit}
            </ContainerInteractionsItemDosage>
          </ContainerInteractionsItem>
        ))}
      </ContainerInteractions>
      <ContainerSources>
        {dataSource?.map(dataSourceItem => (
          <ContainerSourcesItem
            key={dataSourceItem}
            src={`https://www.healthprotection.com/wp-content/themes/dt-the7-child/images/${dataSourceItem}.png`}
            alt={dataSourceItem}
            title={dataSourceItem}
          />
        ))}
      </ContainerSources>
    </Container>
  );
};

export default Tooltip;
