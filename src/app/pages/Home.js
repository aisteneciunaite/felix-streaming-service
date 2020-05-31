import React, { Component } from 'react';

import Button from '../components/Button';
import Hero from '../components/Hero';
import Poster from '../components/Poster';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

const serverUrl = 'https://academy-video-api.herokuapp.com/';

let fetchFreeItems = async () => {
  let data = await fetch(serverUrl + 'content/free-items');
  let items = await data.json();
  return items;
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ isLoaded: true });
    // }, 600);
    fetchFreeItems().then(
      result => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    // console.log('Rendered App');
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
                  <Poster
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                  />
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
