import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfinityScroller extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const { isLoading, remainingScroll, loadNext } = this.props;
    if (isLoading) {
      return false;
    }

    if (this.timeout) {
      window.cancelAnimationFrame(this.timeout);
    }

    this.timeout = window.requestAnimationFrame(() => {
      if (window.innerHeight + window.scrollY > document.body.scrollHeight - remainingScroll) {
        loadNext();
      }
    });
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

InfinityScroller.propTypes = {
  loadNext: PropTypes.func.isRequired,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  remainingScroll: PropTypes.number
};

InfinityScroller.defaultProps = {
  isLoading: false,
  remainingScroll: 400
};

export default InfinityScroller;