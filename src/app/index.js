import './index.scss';
import React from 'react';
import Button from './components/Button';
import Hero from './components/Hero';
import Poster from './components/Poster';
import Spinner from './components/Spinner';
import heroImage from './images/cinema.jpg';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
const serverUrl = 'https://academy-video-api.herokuapp.com/';

let fetchFreeItems = async () => {
  let data = await fetch(serverUrl + 'content/free-items');
  let items = await data.json();
  return items;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 600);
    fetchFreeItems().then(
      result => {
        this.setState({
          // isLoaded: true,
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
    const { isLoaded, items } = this.state;
    return (
      <>
        <Hero title="Wanna more Content ?" background={heroImage}>
          <Button onClick={() => this.setState({ ...this.state, isLoaded: !isLoaded })}>
            Get Access
          </Button>
        </Hero>
        <main>
          <SwitchTransition>
            <CSSTransition
              key={!isLoaded ? 'Spinner' : 'Posters'}
              addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
              classNames="fade"
            >
              <div>
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
              </div>
            </CSSTransition>
          </SwitchTransition>
        </main>
      </>
    );
  }
}

export default App;
