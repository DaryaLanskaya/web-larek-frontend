import { IBasket } from '../../types';
import { createElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class BasketContent implements IBasket {
	private basketElement: HTMLElement; // Шаблон корзины
	private titleElement: HTMLElement; // Заголовок корзины
	private itemListElement: HTMLElement; // Список товаров в корзине
	private actionButton: HTMLButtonElement; // Кнопка - для перехода к оформлению заказа
	private totalPriceElement: HTMLElement; // Общая стоимость заказа

	constructor(private template: HTMLTemplateElement, private events: IEvents) {
		const basketClone = template.content.firstElementChild?.cloneNode(
			true
		) as HTMLElement;
		this.basketElement = basketClone; // Клонируем шаблон корзины
		this.titleElement = this.basketElement.querySelector('.modal__title'); // Заголовок корзины
		this.itemListElement = this.basketElement.querySelector('.basket__list'); // Список товаров в корзине
		this.actionButton = this.basketElement.querySelector(
			'.basket__button'
		)! as HTMLButtonElement; // Кнопка - для перехода к оформлению заказа
		this.totalPriceElement = this.basketElement.querySelector('.basket__price'); // Общая стоимость заказа
		this.setupEventListeners(); // Привязываем события
		this.clearBasket(); // Очистка корзины
	}

	// Настройка обработчиков событий
	private setupEventListeners(): void {
		this.actionButton.addEventListener('click', () =>
			this.events.emit('order:open')
		); // Открываем форму оформления заказа
	}

	// Обновление списка товаров в корзине
	public updateItems(items: HTMLElement[]): void {
		if (items.length === 0) {
			// Если корзина не заполнена
			this.actionButton.setAttribute('disabled', 'true'); // Делаем кнопку неактивной(disabled)
			this.itemListElement.replaceChildren(
				createElement('p', {
					textContent: 'Корзина не заполнена',
					className: 'basket__empty',
				})
			);
		} else {
			// Если корзина заполнена
			this.actionButton.removeAttribute('disabled'); // Делаем кнопку активной
			this.itemListElement.replaceChildren(...items); // Обновление списка товаров
		}
	}
	// Очистка корзины
	private clearBasket(): void {
		this.updateItems([]); // Обновляем товары в корзине (пусто)
		this.totalPrice(0); // Устанавливаем общую цену в 0
	}

	// Отображение общей стоимости товаров в корзине
	public totalPrice(total: number): void {
		this.totalPriceElement.textContent = `${total} синапсов`; // Устанавливаем стоимость
	}

	// Рендер корзины
	public render(): HTMLElement {
		this.titleElement.textContent = 'Корзина'; // Устанавливаем заголовок
		return this.basketElement; // Возвращаем элемент корзины
	}
}
