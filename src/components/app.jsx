import React from 'react';

import Menu from './menu/menu';
import FrameList from './frameList';
const GIF = window.GIF;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowMenu: false,
      images: []
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.setImages = this.setImages.bind(this);
    this.generateGif = this.generateGif.bind(this);
  }

  toggleMenu() {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu });
  }

  setImages(images) {
    this.setState({ images: images });
  }

  generateGif() {
    if (this.state.images.length === 0) {
      return;
    }

    const gif = new GIF({
      workers: 2,
      quality: 10
    });

    gif.on('finished', (blob) => {
      window.open(URL.createObjectURL(blob));
    });

    document.querySelectorAll('.frameCanvas')
      .forEach((canvas) => gif.addFrame(canvas, { delay: 500 }));

    gif.render();
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <button id="menuButton" onClick={this.toggleMenu}><i className="material-icons">menu</i></button>
          <img id="logo" src="___toDo___" alt="logo"></img>
          <Menu hidden={this.state.shouldShowMenu} images={this.state.images} setImages={this.setImages} />
        </div>

        <FrameList images={this.state.images} />

        <div className="footer">
          <button id="generateButton" onClick={this.generateGif}>Generate</button>
        </div>
      </div>
    );
  }
}
