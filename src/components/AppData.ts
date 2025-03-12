import { IAppState, IProduct } from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/events';

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export class AppState extends Model<IAppState> {
	catalog: IProduct[] = [];

	constructor(data: Partial<IAppState>, protected events: IEvents) {
		super(data, events);
		this.catalog = [];
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('items:changed');
	}
}
