import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export default function Modal({ largeImage, onClose }) {
  const clickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      onClose();
    }
  };

  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [onClose]);

  return (
    <div onClick={clickOverlay} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={largeImage} alt="modalImg" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
