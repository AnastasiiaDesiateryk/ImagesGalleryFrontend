import React, { useState, useEffect } from "react";
import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Search from "./Search";
import ImageCard from "./ImageCard";
import Welcome from "./Welcome";
import Spinner from "./Spinner";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

const ImageGallery = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 🔐 Проверка: если токена нет — не пускаем

  const getSavedImages = async () => {
    try {
      // const res = await axios.get(`${API_URL}/images`);
      const res = await axios.get(`${API_URL}/images`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ передаём токен
        },
      });
      setImages(res.data || []);
      setLoading(false);
      // toast.success("Saved images downloaded");
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  // useEffect(() => getSavedImages(), []); код стущука не работает ниже работает
  useEffect(() => {
    const fetchImages = async () => {
      await getSavedImages();
    };

    fetchImages(); // ⬅️ Вызовем её вручную
  }, []);
  // до сюда
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages([{ ...res.data, title: word }, ...images]);
      // toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      // ниже код нужен для того чтобы разлогинить пользователя если истек токен работает только при попытке что то сделать самый простой вариант
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Принудительно на страницу логина
      } else {
        console.log(error);
      }
      //console.log(error);
      // toast.error(error.message);
    }

    setWord("");
  };

  const handleDeleteImage = async (id) => {
    try {
      // const res = await axios.delete(`${API_URL}/images/${id}`);
      const res = await axios.delete(`${API_URL}/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ токен для удаления
        },
      });
      if (res.data?.deleted_id) {
        // toast.warn(
        //   `Image ${images
        //     .find((i) => i.id === id)
        //     .title.toUpperCase()} was deleted`
        // );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      // ниже код нужен для того чтобы разлогинить пользователя если истек токен работает только при попытке что то сделать самый простой вариант
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Принудительно на страницу логина
      } else {
        console.log(error);
      }
      //console.log(error);
      // toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      // const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ токен для сохранения
        },
      });
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        // toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      // ниже код нужен для того чтобы разлогинить пользователя если истек токен работает только при попытке что то сделать самый простой вариант
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Принудительно на страницу логина
      } else {
        console.log(error);
      }
      //console.log(error);
      // toast.error(error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  // console.log("Search component:", Search);
  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <div
          style={{
            position: "relative",
            minHeight: "300px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      {/* <ToastContainer position="bottom-right" /> */}
    </div>
  );
};

export default ImageGallery;
