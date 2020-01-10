import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Home.module.css';
import Button from '../../components/UI/Button/Button';
import Product from '../../components/Product/Product';

class Home extends Component {
  render() {
    const array = [1, 2, 3, 4, 5, 6];
    return (
      <Aux>
        <section className={classes.Main}>
          <div className={classes.MainText}>
            <h1>
              Revolutionary <br />
              Online Shopping
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus quae tenetur esse dolore officiis aliquid! Provident
              molestiae consequatur illum! Similique fuga hic ab omnis dolores,
              odit repellat sit quisquam accusantium?
            </p>
            <Button btnType="Primary" clicked={() => {}}>
              Shop With Us
            </Button>
          </div>
        </section>
        <section className={classes.Products}>
          <h1>New Products</h1>
          <div className={classes.Row}>
            {array.map(index => {
              return <Product key={index} />;
            })}
          </div>
          <div className={classes.MoreProductsLink}>
            <Button btnType="Primary" clicked={() => {}}>
              More Products
            </Button>
          </div>
        </section>
      </Aux>
    );
  }
}

export default Home;
