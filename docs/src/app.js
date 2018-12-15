import React, { Component } from 'react';
import styled from 'styled-components';
import Gallery from 'react-easy-image-gallery';
import Navbar from './navbar';
import InfinityScroller from '../../src/infinity-scroller';

const API = 'https://pixabay.com/api/?key=11039936-6e77e51408504e6821e3c708b&q=new+york+city&image_type=photo';
const LIMIT = 20;

const Heading = styled.h1`
  text-align: center;
  margin: 15rem 0 17rem 0;
`;

const Picture = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 5px;
  box-sizing: border-box;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: null,
      pictures: [],
      isLoading: false
    };
    this.loadNext = this.loadNext.bind(this);
  }

  callApi(page) {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true }, () => {
        fetch(`${API}&page=${page}&per_page=${LIMIT}`)
          .then(res => {
            this.setState({ isLoading: false });
            resolve(res.json());
          })
          .catch(error => {
            reject(error);
          })
      });
    });
  }

  loadNext() {
    const { pictures, page, total } = this.state;

    const newPage = page + 1;
    if (newPage * LIMIT < total) {
      return this.callApi(newPage)
        .then(results => {
          this.setState({
            pictures: pictures.concat(mapResults(results.hits)),
            page: newPage
          });
        });
    }
  }

  componentDidMount() {
    const { pictures, page } = this.state;
    return this.callApi(page)
      .then(results => {
        this.setState({
          pictures: mapResults(results.hits),
          total: results.totalHits
        });
      })
  }

  render() {
    const { pictures, isLoading } = this.state; 
    return (
      <div className="container">
        <Navbar />
        <Heading>nyc</Heading>
        <InfinityScroller
          loadNext={this.loadNext}
          isLoading={isLoading}
        >
          <Gallery images={ pictures } />
        </InfinityScroller>
      </div>
    );
  }
}

function mapResults(hits) {
  return hits.map(picture => ({
    src: picture.webformatURL,
    width: picture.webformatWidth,
    height: picture.webformatHeight
  }));
}