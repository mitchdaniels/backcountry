import React, { Component } from 'react';

class ProductRow extends Component {
	render() {
		const product = this.props.product;

		return (
			<div>
				<div>
					<p className="item-name">		{product.itemName}</p>
					<p className="manufacturer">	{product.manufacturer}</p>
				</div>
				<div>
					<p className="item-type">		{product.itemType}</p>
					<p className="weight">			{product.weight}</p>
				</div>
			</div>
		);
	}
}

class ProductTable extends Component {	
	render() {
		const rows = [];

		this.props.products.forEach((product) => {
			rows.push(
				<ProductRow
					key={product.itemName}
					product={product}
				/>
			);
		});

		return (
			<ul className="productTable">
				{rows}
			</ul>
		);
	}
}


class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {displayedResults: []};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		var query = e.target.value.toLowerCase();

		var displayedResults = [];

		if (query !== "") {
			var displayedResults = Products.filter(function(e) {
				var searchValue = (
					e.itemName + 
					e.manufacturer +
					e.itemType +
					e.weight).toLowerCase();

				return searchValue.indexOf(query) !== -1;
			});
		};

		this.setState({
			displayedResults: displayedResults
		});
	}

	render() {
		return (
			<div>
				<form>
					<input 
						type="text" 
						placeholder="Search..." 
						onChange={this.handleChange} />
				</form>
				<ProductTable products={this.state.displayedResults} />
			</div>
		);
	}
}

class PackingList extends Component {
	render() {
		return (
			<div>
				<SearchBar />
			</div>
		);
	}
}

const Products = [
	{itemName: 'Coyote 4750', manufacturer: 'Kelty', itemType: 'backpack', weight: '5 lb 3 oz'},
	{itemName: 'Hiker Pro', manufacturer: 'Katadyn', itemType: 'water filter', weight: '1 lb 1 oz'},
	{itemName: 'Flash Pro (Long)', manufacturer: 'REI', itemType: 'sleeping pad', weight: '1 lb 2 oz'}
];

export default PackingList