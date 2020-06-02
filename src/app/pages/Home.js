import React, { Component } from 'react';

import Button from '../components/Button';
import Hero from '../components/Hero';
import Poster from '../components/Poster';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

import { fetchFreeItems } from '../modules/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  async componentDidMount() {
    try {
      const result = await fetchFreeItems();
      this.setState({
        isLoaded: true,
        items: result,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <>
        <Hero title="Wanna more Content ?" background={heroImage}>
          <Button onClick={() => this.setState({ ...this.state, isLoaded: !isLoaded })}>
            Get Access
          </Button>
        </Hero>

        <main>
          {!isLoaded ? (
            <Spinner />
          ) : (
            <>
              <div className="posters">
                {items.map(item => (
                  <Poster key={item.id} {...item} />
                ))}
              </div>
              <Button className="align-self-center">Get more content</Button>
            </>
          )}
        </main>
      </>
    );
  }
}

export default Home;
