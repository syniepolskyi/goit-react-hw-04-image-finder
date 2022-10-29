import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ smallImage, largeImage, onClick }){
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={() => onClick(largeImage)}
        src={smallImage}
        alt="found item"
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
