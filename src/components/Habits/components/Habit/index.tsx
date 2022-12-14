import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import Dropdown from 'react-dropdown';

import { useApp } from 'contexts/app';

import HabitData from 'dtos/HabitData';
import FoodData from 'dtos/FoodData';
import ProductData from 'dtos/ProductData';

import Tooltip from '../Tooltip';

import Container, {
  Intro,
  Content,
  Title,
  Question,
  Dosages,
  Nutraceuticals,
  NutraceuticalsLabel,
  Nutraceutical,
} from './styles';

const Habit: React.FC<FoodData> = food => {
  const {
    slug,
    title,
    unit,
    intakeFrequency,
    icon,
    dosages,
    interactions,
    dataSource,
  } = food;

  const context = useApp();
  const {
    labels,
    habits,
    nutraceuticals,
    selectedNutraceuticals,
    products,
    updateHabits,
    updateProducts,
  } = context;

  const nutraceuticalsInteractions = interactions.filter(interaction => {
    return selectedNutraceuticals.includes(interaction.nutraceuticalSlug);
  });

  useEffect(() => {
    ReactToolTip.rebuild();
  });

  const handleHabitInput = useCallback(
    (selectedFood: FoodData, frequency) => {
      const updatedHabits: HabitData[] = [...habits];

      const habitIndex = habits.findIndex(habit => habit.food === food.title);

      if (habitIndex > -1) {
        updatedHabits[habitIndex] = {
          food: selectedFood.title,
          unit: selectedFood.unit,
          icon: selectedFood.icon,
          frequency,
        };

        updateHabits(updatedHabits);
      } else {
        updateHabits([
          ...habits,
          {
            food: selectedFood.title,
            unit: selectedFood.unit,
            icon: selectedFood.icon,
            frequency,
          },
        ]);
      }

      const interactionProducts = selectedFood.interactions
        .filter(interaction =>
          selectedNutraceuticals.includes(interaction.nutraceuticalSlug),
        )
        .reduce((accProducts: ProductData[], interaction) => {
          const updatedProducts = products.filter(
            product => product.nutraceutical !== interaction.nutraceuticalSlug,
          );

          const interactionDosage =
            interaction.dosagesGroup.find(
              dosageGroup => dosageGroup.dosageFrequency === frequency.value,
            )?.dosageAmount || 0;

          const interactionNutraceutical = nutraceuticals.find(
            nutraceutical => nutraceutical.title === interaction.nutraceutical,
          );

          if (!interactionNutraceutical) return updatedProducts;

          const nutraceuticalDosage =
            interactionNutraceutical?.info.dosage || 0;

          const belowAverage = nutraceuticalDosage / 2 > interactionDosage;
          const nutraceuticalProduct = belowAverage
            ? interactionNutraceutical.info.product1
            : interactionNutraceutical.info.product2;

          const selectedProduct = {
            name: nutraceuticalProduct.productName,
            nutraceutical: interaction.nutraceuticalSlug,
            image: nutraceuticalProduct.productImage,
            link: nutraceuticalProduct.productLink,
            brand: nutraceuticalProduct.productBrand,
            dosageCapsule: nutraceuticalProduct.productDosageCapsule,
            capsules: nutraceuticalProduct.productCapsules,
            price: nutraceuticalProduct.productPrice,
          };

          const productExists = !!products.filter(
            product => product.name === selectedProduct.name,
          ).length;

          return productExists
            ? updatedProducts
            : [...updatedProducts, selectedProduct];
        }, []);

      updateProducts(interactionProducts);
    },
    [
      food,
      habits,
      nutraceuticals,
      products,
      selectedNutraceuticals,
      updateHabits,
      updateProducts,
    ],
  );

  return (
    <Container key={slug}>
      <Intro>
        <img src={icon} alt={title} title={title} />
      </Intro>
      <Content>
        <Title>
          {title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color="#1bc9bd"
            data-tip={ReactDOMServer.renderToStaticMarkup(
              <Tooltip
                {...{
                  title,
                  dosages,
                  interactions,
                  dataSource,
                }}
              />,
            )}
            data-for="habit-title-tooltip"
          />
          <ReactToolTip
            id="habit-title-tooltip"
            className="habit-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </Title>

        <Question>{labels.step_3_question.replace('%s', unit)}</Question>
        <Dosages>{dosages}</Dosages>
        <Nutraceuticals>
          <NutraceuticalsLabel>
            {labels.step_3_interactions}
          </NutraceuticalsLabel>

          {nutraceuticalsInteractions.map(nutraceuticalsInteraction => (
            <Nutraceutical key={nutraceuticalsInteraction.nutraceuticalSlug}>
              {nutraceuticalsInteraction.nutraceutical}
            </Nutraceutical>
          ))}
        </Nutraceuticals>
        <Dropdown
          options={intakeFrequency}
          value={intakeFrequency[0]}
          placeholder={labels.step_3_answer}
          onChange={({ value: frequencyValue, label: frequencyLabel }) =>
            handleHabitInput(food, {
              value: frequencyValue,
              label: frequencyLabel,
            })
          }
        />
      </Content>
    </Container>
  );
};

export default Habit;
