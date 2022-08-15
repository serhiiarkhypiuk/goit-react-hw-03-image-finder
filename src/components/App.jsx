import React, { Component } from 'react';
import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageErrorView from './ImageErrorView/ImageErrorView';
import '../styles.css';
import { Button as LoadMoreButton } from './Button/Button';
import styled from 'styled-components';
import Loader from './Loader/Loader';
import ModalWindow from './Modal/Modal';
import api from 'Services/services';

class App extends Component {
  state = {
    imageQuery: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    currImg: {},
  };

  scrollToBottom = () => {
    this.imagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, imageQuery } = this.state;

    if (prevState.imageQuery !== imageQuery || prevState.page !== page) {
      this.setState({ status: 'pending', images: [] });

      api
        .getImages(imageQuery, page)
        .then(results => results.hits)
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    this.scrollToBottom();
  }

  handleFormSubmit = imageQuery => {
    this.setState({ imageQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currImg: image,
    }));
  };

  render() {
    const { images, error, status, imageQuery, currImg, showModal } =
      this.state;

    return (
      <Div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <IntroductoryText>What do you want to find?</IntroductoryText>
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && !images.length && (
          <ImageErrorView
            message={`No images regarding ${imageQuery} was found!`}
          />
        )}
        {status === 'rejected' && <ImageErrorView message={error.message} />}
        {status === 'resolved' && (
          <ImageGallery images={images} onOpenModal={this.toggleModal} />
        )}
        {images.length > 11 && <LoadMoreButton onClick={this.onLoadMore} />}
        {showModal && (
          <ModalWindow onClose={this.toggleModal}>
            <img src={currImg.largeImageURL} alt={currImg.tags} />
          </ModalWindow>
        )}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.imagesEnd = el;
          }}
        ></div>
      </Div>
    );
  }
}

const IntroductoryText = styled.h1`
  color: #3f51b5;
  margin: auto;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default App;
