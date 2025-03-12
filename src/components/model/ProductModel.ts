import { IProduct, IProductModel } from '../../types';
import { IEvents } from '../base/events';

export class ProductModel implements IProductModel {
	protected _products: IProduct[];
	selected: IProduct;

	constructor(protected events: IEvents) {
		this._products = [];
	}

	set products(data: IProduct[]) {
		console.log(data);
		this._products = data;
		this.events.emit('cards:get');
	}

	get products() {
		return this._products;
	}

	setPreview(item: IProduct) {
		this.selected = item;
		this.events.emit('modalCard:open', item);
	}
}
