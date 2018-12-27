import React, { Component } from 'react';
import data from './data'

class ProductCategoryRow extends Component {
    render() {
      return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
  }
  
class ProductRow extends Component {
    render() {
      var name = this.props.product.stocked ?
        this.props.product.name :
        <span style={{color: 'red'}}>
          {this.props.product.name}
        </span>;
      return (
        <tr>
          <td>{name}</td>
          <td>{this.props.product.price}</td>
        </tr>
      );
    }
  }
  
class ProductTable extends Component {
    render() {
      var rows = [];
      var lastCategory = null;
      this.props.products.forEach(function(product) {
        if (product.category !== lastCategory) {
          rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
      });
      return (
        <table>
          <thead>
            <tr>
              <th>demo2 - Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  
class SearchBar extends Component {
    render() {
      return (
        <form>
          <input type="text" placeholder="Search..." />
          <p>
            <input type="checkbox" />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
  }
  
export default class FilterableProductTable extends Component {
    render() {
      return (
        <div>
          <SearchBar />
          <ProductTable products={data} />
        </div>
      );
    }
}