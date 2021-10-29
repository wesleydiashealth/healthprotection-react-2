import React from 'react';
// import { FaTimesCircle } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Container, {
  Product,
  ProductImage,
  ProductContent,
  ProductContentTitle,
  ProductContentTitleLink,
  ProductContentDosage,
  ProductInfo,
  ProductPrice,
} from './styles';

const Products: React.FC = () => {
  const context = useApp();
  const { labels, nutraceuticals, selectedNutraceuticals } = context;

  return (
    <Container>
      {selectedNutraceuticals.map(selectedNutraceutical => {
        const currentProduct = nutraceuticals.find(
          nutraceutical => nutraceutical.slug === selectedNutraceutical,
        );

        return (
          <Product key={selectedNutraceutical}>
            <ProductImage
              src={`${process.env.PUBLIC_URL}/svg/${currentProduct?.slug}.svg`}
              alt={currentProduct?.title}
              title={currentProduct?.title}
            />
            <ProductContent>
              <ProductContentTitle>
                {currentProduct?.info.productLink ? (
                  <ProductContentTitleLink
                    href={currentProduct?.info.productLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {currentProduct?.title}
                  </ProductContentTitleLink>
                ) : (
                  currentProduct?.title
                )}
              </ProductContentTitle>
              <ProductContentDosage>
                {currentProduct?.dosage}
              </ProductContentDosage>
            </ProductContent>
            <ProductInfo
              href={currentProduct?.info.link}
              target="_blank"
              rel="noreferrer"
            >
              {labels?.cart_science}
            </ProductInfo>
            <ProductPrice>
              {!!currentProduct?.info.productPrice && (
                <>
                  {`${new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(currentProduct.info.productPrice)}`}
                </>
              )}
            </ProductPrice>
          </Product>
        );
      })}
    </Container>
  );
};

export default Products;
