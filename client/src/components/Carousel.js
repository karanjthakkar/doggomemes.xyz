import React, { Component } from 'react';
import './Carousel.css';
import Slider from 'react-slick';

const images = [...Array(10).keys()].map(name =>
  require(`../images/${name + 1}.jpg`)
);

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialIndex: props.initialIndex
    };
  }

  render() {
    const settings = {
      arrows: true,
      fade: true,
      speed: 200,
      slidesToScroll: 1,
      initialSlide: this.state.initialIndex
    };
    return (
      <div className="carousel">
        <Slider {...settings} afterChange={this.props.onSlideChange}>
          {images.map((imageUrl, index) => {
            const imageAlt = `Image ${index}`;
            return (
              <div key={imageUrl}>
                <img
                  src={imageUrl}
                  className="carousel__image"
                  alt={imageAlt}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
