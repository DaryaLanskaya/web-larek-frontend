import { IBasketModel, IProduct } from '../../types';

// Класс, который реализует модель корзины покупок
export class BasketModel implements IBasketModel {
	private _basketProducts: IProduct[] = []; // Свойство для хранения списка товаров в корзине

	constructor() {}

	// Геттер - получаем список товаров в корзине
	get basketProducts(): IProduct[] {
		return this._basketProducts;
	}

	// Используем этот метод для добавления товара в корзину
	public setSelectedCard(item: IProduct): void {
		this._basketProducts.push(item); // Добавляет товар в массив товаров корзины
	}

	//  Используем этот метод для удаления товара из корзины
	public deleteCardToBasket(item: IProduct): void {
		const index = this._basketProducts.findIndex(
			(product) => product.id === item.id
		); // Нахождение индекса товара в корзине
		if (index !== -1) {
			this._basketProducts.splice(index, 1); // Удаление товара из корзины
		}
	}

	//  Используем этот метод для очистки корзины
	public clearBasketProducts(): void {
		this._basketProducts = []; // Очищение массива товаров корзины
	}

	// Используем этот метод для получения количества товаров в корзине
	public getCounter(): number {
		return this._basketProducts.length; // Вернем количество товаров в корзине
	}

	// Используем этот метод для получения общей стоимости всех товаров в корзине
	public getTotalPrice(): number {
		return this._basketProducts.reduce(
			(sum, product) => sum + (product.price || 0),
			0
		); // Сумма цен всех товаров в корзине
	}

	// Используем этот метод для получения идентификаторов всех товаров в корзине
	public getProductIds(): string[] {
		return this._basketProducts.map((product) => product.id);
	}
}
