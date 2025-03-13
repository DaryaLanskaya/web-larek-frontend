import { IBasketModel, IProduct } from '../../types';

// Класс, реализующий модель корзины покупок
export class BasketModel implements IBasketModel {
	private _basketProducts: IProduct[] = []; // Приватное свойство для хранения списка товаров в корзине

	constructor() {}

	// Геттер для получения списка товаров в корзине
	get basketProducts(): IProduct[] {
		return this._basketProducts;
	}

	// Метод для добавления товара в корзину
	public setSelectedCard(item: IProduct): void {
		this._basketProducts.push(item); // Добавляем товар в массив товаров корзины
	}

	// Метод для удаления товара из корзины
	public deleteCardToBasket(item: IProduct): void {
		const index = this._basketProducts.findIndex(
			(product) => product.id === item.id
		); // Находим индекс товара в корзине
		if (index !== -1) {
			this._basketProducts.splice(index, 1); // Удаляем товар из корзины
		}
	}

	// Метод для очистки корзины
	public clearBasketProducts(): void {
		this._basketProducts = []; // Очищаем массив товаров корзины
	}

	// Метод для получения количества товаров в корзине
	public getCounter(): number {
		return this._basketProducts.length; // Возвращаем количество товаров в корзине
	}

	// Метод для получения общей стоимости всех товаров в корзине
	public getTotalPrice(): number {
		return this._basketProducts.reduce(
			(sum, product) => sum + (product.price || 0),
			0
		); // Суммируем цену всех товаров в корзине
	}

	// Метод для получения идентификаторов всех товаров в корзине
	public getProductIds(): string[] {
		return this._basketProducts.map((product) => product.id);
	}
}
