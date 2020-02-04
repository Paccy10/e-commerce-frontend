/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Bar, Doughnut } from 'react-chartjs-2';
import Layout from '../Layout/Layout';
import classes from './Dashboard.module.css';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class Dashboard extends Component {
  async componentDidMount() {
    await this.props.onFetchBrands();
    await this.props.onFetchCategories();
  }

  render() {
    let categories = <Spinner />;
    let brands = <Spinner />;
    const colors = [
      'rgba(54, 162, 235, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)'
    ];
    if (!this.props.categoryLoading) {
      const labelBackColors = [];
      let y = 0;
      for (let i = 0; i < this.props.categories.length; i++) {
        if (y < colors.length) {
          labelBackColors.push(colors[y]);
          y++;
        } else {
          y = 0;
          labelBackColors.push(colors[y]);
          y++;
        }
      }
      const barChartData = {
        labels: this.props.categories.map(category => {
          return category.name;
        }),
        datasets: [
          {
            label: 'Products',
            data: this.props.categories.map(category => {
              return category.products.length;
            }),
            backgroundColor: labelBackColors
          }
        ]
      };
      const barChartOptions = {
        title: {
          display: true,
          text: 'PRODUCTS CATEGORIES',
          fontSize: 20
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
            fontSize: 15
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        }
      };
      categories = <Bar data={barChartData} options={barChartOptions} />;
    }

    if (!this.props.brandLoading) {
      const labelBackColors = [];
      let y = 0;
      for (let i = 0; i < this.props.brands.length; i++) {
        if (y < colors.length) {
          labelBackColors.push(colors[y]);
          y++;
        } else {
          y = 0;
          labelBackColors.push(colors[y]);
          y++;
        }
      }

      const pieChartData = {
        labels: this.props.brands.map(brand => {
          return brand.name;
        }),
        datasets: [
          {
            label: 'Products',
            data: this.props.brands.map(brand => {
              return brand.products.length;
            }),
            backgroundColor: labelBackColors
          }
        ]
      };
      const pieChartOptions = {
        title: {
          display: true,
          text: 'PRODUCTS BRANDS',
          fontSize: 20
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
            fontSize: 15
          }
        }
      };
      brands = <Doughnut data={pieChartData} options={pieChartOptions} />;
    }

    return (
      <Layout>
        <div className={classes.Card}>{categories}</div>
        <div className={classes.Card}>{brands}</div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  categoryLoading: PropTypes.bool,
  brandLoading: PropTypes.bool,
  brands: PropTypes.array,
  categories: PropTypes.array,
  onFetchBrands: PropTypes.func,
  onFetchCategories: PropTypes.func
};

const mapStateToProps = state => ({
  categoryLoading: state.category.loading,
  brandLoading: state.brand.loading,
  brands: state.brand.brands,
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  onFetchBrands: () => dispatch(actions.fetchBrands()),
  onFetchCategories: () => dispatch(actions.fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
