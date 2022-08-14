import React, { Component } from "react"
import Searchbar from "./SearchBar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"
import ImageErrorView from "./ImageErrorView/ImageErrorView";
import '../styles.css'
import { Button as LoadMoreButton } from "./Button/Button"
import styled from "styled-components";
import Loader from "./Loader";

class App extends Component {
  state = {
    imageQuery: "",
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    myRef: React.createRef()
    // showModal: false,
    // currImg: {}
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, imageQuery } = this.state

    if (prevState.imageQuery !== imageQuery) {
      this.setState({ status: 'pending', page: 1 })

      fetch(`https://pixabay.com/api/?q=${imageQuery}
        &page=${page}
        &key=27902479-6e547d16e6e2929c1a5ae9702&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
            return response.json()
        }
        
        return Promise.reject(new Error(`No images regarding ${imageQuery} was found`))
      })
      .then((results) => results.hits)
      .then((images) => this.setState({ images: images, status: 'resolved' }))
      .catch((error) => this.setState({ error, status: 'rejected' }))
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' })
      
      fetch(`https://pixabay.com/api/?q=${imageQuery}
        &page=${page}
        &key=27902479-6e547d16e6e2929c1a5ae9702&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
          return Promise.reject(new Error(`No images regarding ${imageQuery} was found!`))
        })
      .then((results) => results.hits)
      .then((images) => this.setState((prevState) =>
          ({ images: [...prevState.images, ...images], status: 'resolved' })))
        .catch((error) => this.setState({ error, status: 'rejected' }))
    }
  }

  handleFormSubmit = imageQuery => {
    this.setState({ imageQuery })
  }

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }))
  }

  render() {
    const { images, error, status, imageQuery } = this.state
    return (
      <Div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && <IntroductoryText>What do you want to find?</IntroductoryText>}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && !images.length && <ImageErrorView message={`No images regarding ${imageQuery} was found!`}/>}
        {status === 'rejected' && <ImageErrorView message={error.message} />}
        {status === 'resolved' && <ImageGallery images={images} />}
        {images.length > 0 && <LoadMoreButton onClick={this.onLoadMore}/>}
      </Div>
    )
  }
}

const IntroductoryText = styled.h1`
  color: #3f51b5;
  margin: auto;
`

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`

export default App