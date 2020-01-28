/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../../Layout/Layout';
import classes from './View.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import DeleteSummary from '../../../../../components/DeleteSummary/DeleteSummary';
import Aux from '../../../../../hoc/Aux/Aux';
import * as actions from '../../../../../store/actions';

class View extends Component {
  state = {
    deleting: false
  };

  async componentDidMount() {
    const { productId } = this.props.match.params;
    await this.props.onFetchProduct(productId);
    if (this.props.product.brand_id) {
      await this.props.onFetchBrand(this.props.product.brand_id);
    }
    await this.props.onFetchCategory(this.props.product.category_id);
  }

  imgRef = React.createRef();

  onOpenImage = event => {
    const mainImage = this.imgRef.current;
    mainImage.src = event.target.src;
  };

  onDelete = () => {
    this.setState({ deleting: true });
  };

  deleteCancelHandler = () => {
    this.setState({ deleting: false });
  };

  deleteContinueHandler = () => {
    this.props
      .onDeleteProduct(this.props.match.params.productId, this.props.token)
      .then(() => {
        this.setState({ deleting: false });
        this.props.history.push('/admin/products');
      });
  };

  onEdit = productId => {
    this.props.history.push(`/admin/products/${productId}/edit`);
  };

  render() {
    let product = <Spinner />;
    if (!this.props.loading && this.props.product && this.props.category) {
      product = (
        <Aux>
          <div className={classes.Images}>
            <div className={classes.MainImage}>
              <img
                ref={this.imgRef}
                src={this.props.product.main_image.url}
                alt=""
              />
            </div>
            <div className={classes.SmallIMages}>
              <img
                src={this.props.product.main_image.url}
                alt=""
                onClick={this.onOpenImage}
              />
              {this.props.product.images
                ? this.props.product.images.map(image => {
                    return (
                      <img
                        key={image.public_id}
                        src={image.url}
                        alt=""
                        onClick={this.onOpenImage}
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <div className={classes.Details}>
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.description}</p>
            <p>
              <strong>Category: </strong> {this.props.category.name}
            </p>
            <p>
              <strong>Brand: </strong>
              {this.props.brand ? this.props.brand.name : '-'}
            </p>
            <p>
              <strong>Price: </strong> {this.props.product.price}
            </p>
            <p>
              <strong>Quantity: </strong>
              {this.props.product.quantity}
            </p>
            <Button btnType="Danger" onClick={this.onDelete}>
              Delete
            </Button>
            <Button
              btnType="Success"
              onClick={() => this.onEdit(this.props.match.params.productId)}
            >
              Edit
            </Button>
          </div>
        </Aux>
      );
    }

    let deleteModal = null;
    if (this.state.deleting) {
      deleteModal = (
        <DeleteSummary
          show={this.state.deleting}
          cancelHandler={this.deleteCancelHandler}
          continueHandler={this.deleteContinueHandler}
        >
          {this.props.loading ? (
            <Spinner />
          ) : (
            <p>
              {' '}
              Are you sure you want to delete{' '}
              <strong>
                {this.props.product
                  ? this.props.product.name.charAt(0).toUpperCase() +
                    this.props.product.name.substring(1)
                  : null}
              </strong>{' '}
              Product?
            </p>
          )}
        </DeleteSummary>
      );
    }
    return (
      <Layout>
        <div className={classes.Card}>
          {deleteModal}
          {product}
        </div>
      </Layout>
    );
  }
}

View.propTypes = {
  loading: PropTypes.bool,
  onFetchProduct: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object,
  brand: PropTypes.object,
  category: PropTypes.object,
  onFetchBrand: PropTypes.func,
  onFetchCategory: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  token: PropTypes.string,
  // message: PropTypes.string,
  history: PropTypes.object
};

const mapSateToProps = state => ({
  loading: state.product.loading,
  product: state.product.products[0],
  message: state.product.message,
  brand: state.brand.brands[0],
  category: state.category.categories[0],
  token: state.auth.token
});

const mapStateToDispatch = dispatch => ({
  onFetchProduct: productId => dispatch(actions.fetchProduct(productId)),
  onFetchBrand: brandId => dispatch(actions.fetchBrand(brandId)),
  onFetchCategory: categoryId => dispatch(actions.fetchCategory(categoryId)),
  onDeleteProduct: (productId, token) =>
    dispatch(actions.deleteProduct(productId, token))
});

export default connect(mapSateToProps, mapStateToDispatch)(View);
