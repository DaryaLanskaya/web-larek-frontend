import { IAppState, IProduct } from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/Events';

export class Product extends Model<IProduct> {
	id: string; // Идентификатор товара
	description: string; // Описание товара
	image: string; // Изображение товара
	title: string; // Заголовок товара
	category: string; // Категория товара
	price: number | null; // Стоимость товара
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
