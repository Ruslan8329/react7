import React, { useState, useEffect } from "react";
import axios from "axios";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};

const ImageGalleryItem = ({ image }) => {
  return (
    <li className="gallery-item">
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
};

const Loader = () => {
  return <div className="loader">Loading...</div>;
};

const Button = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Load More
    </button>
  );
};

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

const ImageSearchApp = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=44595567-d47cafe0de06eed8172edcbb4&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages((prevImages) =>
          page === 1
            ? response.data.hits
            : [...prevImages, ...response.data.hits]
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {selectedImage && (
        <Modal largeImageURL={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ImageSearchApp;
