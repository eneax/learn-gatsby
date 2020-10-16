import React from 'react';
import { ItemsGrid, ItemStyled } from '../styles/grids';

const ItemGrid = ({ items }) => (
  <ItemsGrid>
    {items.map(({ name, image }) => (
      <ItemStyled key={name}>
        <p>
          <span className="mark">{name}</span>
        </p>
        <img
          width="500"
          height="400"
          src={`${image.asset.url}?w=500&h=400&fit=crop`} // sanity magic
          alt={name}
          style={{
            background: `url(${image.asset.metadata.lqip})`,
            backgroundSize: 'cover',
          }}
        />
      </ItemStyled>
    ))}
  </ItemsGrid>
);

export default ItemGrid;
