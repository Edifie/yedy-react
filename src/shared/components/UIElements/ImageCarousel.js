import React from "react";
import ImageGallery from "react-image-gallery";

const ImageCarousel = (props) => {
  const images = props.images.map((image) => ({
    original: `data:${image.contentType};base64,${image.imageBase64}`,
    thumbnail: `data:${image.contentType};base64,${image.imageBase64}`,
  }));

  return <ImageGallery items={images} />;
};

export default ImageCarousel;
