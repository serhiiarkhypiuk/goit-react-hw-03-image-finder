import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styled from 'styled-components';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          onClick={onOpenModal}
          image={image}
          key={image.id}
          small={image.webformatURL}
          large={image.largeImageURL}
          alt={image.tags}
        />
      ))}
    </Gallery>
  );
};

const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export default ImageGallery;
