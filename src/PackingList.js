import React, { Component } from 'react';
import update from 'immutability-helper'
import './PackingList.css'

export class ListName extends Component {

	render() {
		// function deselect(e) {
		// 	if(e.which==13||e.keyCode==13){
  //   			this.blur();
		// 	};	
		// }

		return (
			/*<form onSubmit={deselect} className="list-name">*/
				<input type="text" default="List Name" placeholder="List Name"></input>
			/*</form>*/
		);
	}
}

export class Location extends Component {

	// https://github.com/kenny-hibino/react-places-autocomplete

	render() {
		return (
			<div className="location">
				<span className="glyphicon glyphicon-map-marker"></span>
				<p>Great Smoky Mountain National Park</p>
			</div>
		);
	}
}

export class Dates extends Component {

	// http://airbnb.io/react-dates/?selectedKind=DayPickerRangeController&selectedStory=with%20custom%20inputs&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
	// http://airbnb.io/react-dates/?selectedKind=DRP%20-%20Input%20Props&selectedStory=small%20styling&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

	render() {
		return (
			<div className="dates">
				<span className="glyphicon glyphicon-calendar"></span>
				<p>May 24 - May 28, 2018 (5 days)</p>
			</div>
		);
	}
}

export class ItemTables extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items
		};


		this.addCategory 	= this.addCategory.bind(this);
		this.addItem 		= this.addItem.bind(this);
		this.editItem		= this.editItem.bind(this);
		this.removeItem 	= this.removeItem.bind(this);
	};

	addCategory(category) {
		this.addItem(Date.now())
	}

	addItem(itemCategory) {
		let newItem = {
			category: itemCategory
		}

		newItem.name = prompt('Item Name');
		newItem.key = Date.now();

		this.setState({
			items: this.state.items.concat(newItem)
		});
	}

	editItem(key, propName) {
		const index = this.state.items.findIndex(item => item.key === key);
		const newState = update(this.state, {items: {[index]: {$merge: {[propName]: "Example"}}}});
		this.setState(newState);
	}

	removeItem(key) {
		let filteredItems = this.state.items.filter(function (item) {
			return (item.key !== key);
		});

		this.setState({
			items: filteredItems
		});
	}

	render() {

		const tables = [];
		let filteredItems = [];

		const categories = [...new Set(this.state.items.map(item => item.category))];

		categories.forEach((category) => {
			filteredItems = this.state.items.filter(function (item) {
				return item.category === category;
			});

			tables.push(
				<ItemTable 
					category={category} 
					items={filteredItems}
					key={category}
					addItem={this.addItem}
					editItem={this.editItem}
					removeItem={this.removeItem}
				/>
			);
		});

		return (
			<div>
				{tables}
				<p className="add-category" onClick={this.addCategory}>Add Category</p>
			</div>
		);
	}
}

export class ItemTable extends Component {

	render() {
		const rows = [];

		this.props.items.forEach((item) => {
			rows.push(
				<ItemRow 
					item={item}
					editItem={this.props.editItem}
					removeItem={this.props.removeItem}
					key={item.key}
				/>
			)
		});

		rows.push(<SummaryRow key="summary" addItem={this.props.addItem} category={this.props.category}/>);

		return (
			<div className="item-table">
				<table className={this.props.category}>
					<HeaderRow category={this.props.category}/>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}

export class HeaderRow extends Component {

	render() {
		return (
			<thead>
				<tr>
					<th><div className="legend"></div>{this.props.category}</th>
					<th>Weight</th>
					<th>Quantity</th>
				</tr>
			</thead>
		);
	}
}

export class ItemRow extends Component {

	render() {
		const item = this.props.item

		return (
			<tr className="item-row" key={item.key}>
				<td><EditableText value={item.name} propName="name" onClick={this.props.editItem} keyv={item.key}/></td>
				<td onClick={() => this.props.editItem(item.key, "weight")}>{item.weight}</td>
				<td>{item.quantity}</td>
				<td><span className="glyphicon glyphicon-star-empty"></span></td>
				<td><span className="glyphicon glyphicon-remove" onClick={() => this.props.removeItem(item.key)}></span></td>
			</tr>
		);
	}
}

export class EditableText extends Component {
	render() {
		return (
			<p onClick={() => this.props.onClick(this.props.keyv, this.props.propName)}>{this.props.value}</p>
		);
	}
}

export class SummaryRow extends Component {

	render() {
		return (
			<tr className="summary-row">
				<td key={this.props.category} className="add-item" onClick={() => this.props.addItem(this.props.category)}>Add Item</td>
				<td>Weight SUM</td>
				<td>Qty SUM</td>
				<td></td>
			</tr>
		);
	}
}

export class PackingList extends Component {

	render() {
	
		return (
			<div>
				<ListName />
				<div className="list-metadata">
					<Location />
					<Dates />
				</div>
				<div className="weight-chart"></div>
				<ItemTables items={Items}/>
			</div>
		);
	}
}

const Items = [
	{
		category: "Essentials",
		name: "Kelty Coyote 4750 Backpack",
		weight: "4 lbs 8 oz",
		quantity: 1,
		key: 1
	},
	{
		category: "Essentials",
		name: "Katadyn Hiker Pro Water Filter",
		weight: "2 lbs 1 oz",
		quantity: 1,
		key: 2
	},
	{
		category: "Essentials",
		name: "REI Flash Pro (Long) Sleeping Pad",
		weight: "1 lbs 11 oz",
		quantity: 1,
		key: 3
	},
	{
		category: "Essentials",
		name: "REI Nano 55",
		weight: "2 lbs 9 oz",
		quantity: 1,
		key: 4
	},
	{
		category: "Food",
		name: "Mountain House Lasagna",
		weight: "10 oz",
		quantity: 2,
		key: 5
	},
	{
		category: "Food",
		name: "Mountain House Breakfast Scramble",
		weight: "11 oz",
		quantity: 2,
		key: 6
	}
]

export default PackingList