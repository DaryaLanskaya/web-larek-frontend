import {
	IOrderInfo,
	IOrderResult,
	IProduct,
	IProducts,
} from './../types/index';
import { Api, ApiListResponse } from './base/Api';

export interface ILarekAPI {
	getProductList: () => Promise<IProduct[]>;
	items: IProduct[];
}

export class LarekAPI extends Api implements ILarekAPI {
	readonly cdn: string;
	items: IProduct[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrder(orderData: IOrderInfo): Promise<IOrderResult> {
		return this.post('/order', orderData).then((data: IOrderResult) => data);
	}
}
