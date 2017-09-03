import React, { Component } from 'react';
import Carousel from './Carousel';
import Caption from './Caption';
import './App.css';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://doggomemes.now.sh'
  : 'http://localhost:8111';

class App extends Component {
  state = {
    text: '',
    currentSlideIndex: 0,
    isDownloadingMeme: false
  };

  downloadMeme = async () => {
    this.setState({
      isDownloadingMeme: true
    });
    const response = await fetch(`${BASE_URL}/create/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.text,
        backgroundId: this.state.currentSlideIndex + 1
      })
    });
    const { image_name } = await response.json();
    this.setState({
      isDownloadingMeme: false
    });
    window.location.href = `${BASE_URL}/assets/generated/${image_name}?download=1`;
  };

  handleChange = event => {
    this.setState({
      text: event.target.value.replace(/\s+/g, ' ')
    });
  };

  onSlideChange = index => {
    this.setState({
      currentSlideIndex: index
    });
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.downloadMeme();
    }
  };

  render() {
    return (
      <div className="app">
        <div className="app__logo">
          <span role="img" aria-label="puppy emoji">🐶</span>
        </div>
        <div className="app__image">
          <Carousel
            onSlideChange={this.onSlideChange}
            initialIndex={this.state.currentSlideIndex}
          />
          <Caption text={this.state.text} />
        </div>
        <div className="app__input">
          <input
            type="text"
            placeholder="Enter the meme caption"
            className="app__input__text"
            value={this.state.text}
            autoFocus
            spellCheck={false}
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
          />
          <button onClick={this.downloadMeme} className="app__input__submit">
            {this.state.isDownloadingMeme ? 'Downloading...' : 'Download Meme'}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
