import React, { Component, Fragment } from 'react';
import InfinityScroller from '../../src/infinity-scroller';

const API = 'https://pixabay.com/api/?key=11039936-6e77e51408504e6821e3c708b&q=banff&image_type=photo';
const LIMIT = 20;

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
    return fetch(`${API}&page=${page}&per_page=${LIMIT}`)
      .then(res => res.json())
  }

  loadNext() {
    const { isLoading, pictures, page, total } = this.state;

    const newPage = page + 1;

    if (!isLoading && (newPage * LIMIT) < total) {
      return this.callApi(newPage)
      .then(results => {
        console.log(results);
        this.setState({
          pictures: pictures.concat(results.hits),
          page: newPage
        });
      });
    }
  }

  componentDidMount() {
    const { pictures, page } = this.state;
    return this.callApi(page)
      .then(result => {
        this.setState({
          pictures: result.hits,
          total: result.totalHits
        });
      })
  }

  render() {
    const { pictures } = this.state; 
    return (
      <div className="container">
        <h1>Hi there!</h1>
        <InfinityScroller
          loadNext={this.loadNext}
        >
          { pictures.map(picture => (
            <div key={picture.id}>
              <img src={picture.previewURL}/>
            </div>
          ))}
        </InfinityScroller>
      </div>
    );
  }
}