import { IProduct, IProductModel } from '../../types';
import { IEvents } from '../base/Events';

export class ProductModel implements IProductModel {
	protected _products: IProduct[]; // Свойство для хранения списка товаров
	selected: IProduct;

	constructor(protected events: IEvents) {
		this._products = [];
	}

	set products(data: IProduct[]) {
		this._products = data;
		this.events.emit('cards:get');
	}

	get products() {
		return this._products; // Возвращаем товары
	}

	setDetail(item: IProduct) {
		this.selected = item;
		this.events.emit('modalCard:open', item);
	}
}
