# react-easy-infinity-scroller
A simple and reusable &lt;InfinityScroller />

![downloads](https://img.shields.io/npm/dm/react-easy-infinity-scroller.svg)

![gif](https://media.giphy.com/media/24FMu7nJuj6GEoE5IC/giphy.gif)

Features:

- simple and intuitive; works with just the `children` and `loadNext` props
- 4kb unminified
- works on Chrome, Firefox, Edge, and IE10

## Live Demo and Example

https://coldshower.github.io/react-easy-infinity-scroller

## Installation

`npm install react-easy-infinity-scroller` 

## Using it

```jsx
import { InfinityScroller } from 'react-easy-infinity-scroller';

// ...

loadNext() {
  const { pictures, currentPage } = this.state;

  const newPage = currentPage + 1;
  if (newPage * ITEMS_PER_PAGE < TOTAL_NUM_OF_PICTURES) {
    return this.callApi(newPage)
      .then(results => {
        this.setState({
          pictures: pictures.concat(results)),
          currentPage: newPage
        });
      });
  }
}

// ...

<InfinityScroller 
  loadNext={loadNext}
>
  { pictures.map(picture => (
    <div key={picture.id}>
      <img src={picture.url} />
    </div>
  ))}
</InfinityScroller>

// ...
```

Check the [demo](https://coldshower.github.io/react-easy-infinity-scroller) and its code in `/docs` for a more real life example!

## Props

| Name             | Type           | Default  | Description |
|:------------------|:-------------:|:--------:|:----------- |
| loadNext`required`| function      |          |a function that makes an API call, usually with modified `page` or `offset` query params for the next part of the content |
| children          | node or array |          |usually a list of whatever you want to be infinitely scrolled | 
| isLoading         | boolean       |  false   |default usually will suffice but if you want each picture to take up more room in a row, then increase this until satisfied | 
| remainingScroll   | number        |  400     |remaining height(px) on scrollbar before `loadNext` is called | 


## Contributing

1. Clone the repository
2. `nvm use` and `npm install`
3. `npm start` and open `localhost:8080`
4. Submit a pull request

## Notes

Stock photos are from Pixabay's Developer API and can be found here https://pixabay.com/en/photos/new+york+city/.