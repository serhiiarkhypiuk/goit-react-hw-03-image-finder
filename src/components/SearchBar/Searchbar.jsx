import React, { Component } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  Input,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageQuery: '',
  };

  handleChange = event => {
    this.setState({ imageQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageQuery.trim() === '') {
      alert('Please enter your search query');
      return;
    }

    this.props.onSubmit(this.state.imageQuery);
    // this.setState({ imageQuery: '' });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" onClick={this.handleSubmit}>
            <SearchFormButtonLabel></SearchFormButtonLabel>
          </SearchFormButton>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

export default Searchbar;
