import Carousel from 'react-bootstrap/Carousel';

function carousels() {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
      <img className="d-md-block w-100" src={process.env.PUBLIC_URL + '/vegetables.jpg'} style={{height: '300px'}} alt="Image One"
          />
        <Carousel.Caption>
          <h1>Vegetables</h1>
          <h4>Love your health and love your vegetables.</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
      <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + '/fruits.jpg'} style={{height: '300px'}}
            alt="Image Two"
          />
        <Carousel.Caption>
          <h1>Fruits</h1>
          <h5>Nature has the best candies.</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
      <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + '/flowers.jpg'} style={{height: '300px'}}
            alt="Image Two"
          />
        <Carousel.Caption>
          <h1>Flowers</h1>
          <h5>
          There's nothing like fresh flowers.
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default carousels;