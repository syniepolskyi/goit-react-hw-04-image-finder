import { useState, useEffect, useRef } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import { fetchImagesWithQuery, perPage } from '../services/imagesApi';
import Button from './button/Button';
import { Oval as Loader } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './modal/Modal';

import styles from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [theEnd, setTheEnd] = useState(false);
  const prevSearchQueryRef = useRef();
  const prevPageRef = useRef();

  const handleSearchbarSubmit = query => {
    setSearchQuery(query);
  };

  const openModal = imageUrl => {
    setModalImage(imageUrl);
  };

  const closeModal = e => {
    setModalImage(null);
  };

  useEffect(() => {
    if (!searchQuery.trim().length) {
      return;
    }
    if (
      !prevSearchQueryRef.current ||
      prevSearchQueryRef.current.trim().toUpperCase() !==
        searchQuery.trim().toUpperCase()
    ) {
      setResults([]);
      setTheEnd(false);
      prevPageRef.current = 0;
      prevSearchQueryRef.current = searchQuery;
      if (page !== 1) {
        setPage(1); //trigger useEffect!
        return;
      }
    }
    if (prevPageRef.current === page) {
      return;
    }
    prevPageRef.current = page;
    setLoading(true);
    fetchImagesWithQuery(searchQuery, page)
      .then(({ hits: images, total }) => {
        if (total === 0) {
          toast.error('Images or pictures not found');
          return;
        }
        if (page === 1) {
          toast.success(`${total} images found`);
          setTotalCnt(total);
        }
        setResults(results => [...results, ...images]);
      })
      .catch(error => {
        toast.error(
          'Something went wrong, open dev console to read error message'
        );
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    setTheEnd(results.length === totalCnt);
    if (results.length > perPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [results, totalCnt]);

  return (
    <div className={styles.App}>
      <Toaster position="top-right" />
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery images={results} onClick={openModal} />
      {modalImage && <Modal largeImage={modalImage} onClose={closeModal} />}
      {loading && (
        <div className={styles.Loader}>
          <Loader
            color="#4fa94d"
            ariaLabel="oval-loading"
            height={100}
            width={100}
          />
        </div>
      )}
      {results.length > 0 && !theEnd && !loading && (
        <Button onClick={() => setPage(page + 1)} />
      )}
    </div>
  );
}
