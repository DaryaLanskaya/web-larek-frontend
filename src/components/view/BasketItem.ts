import { IActions, IBasketItem, IProduct } from '../../types';

export class BasketItem implements IBasketItem {
	private _basketItem: HTMLElement; // Элемент корзины (HTML)
	private _elements: {
		// Список внутренних элементов для работы с DOM
		index: HTMLElement; // Индекс товара в корзине
		title: HTMLElement; // Название товара
		price: HTMLElement; // Цена товара
		buttonDelete: HTMLButtonElement; // Кнопка для удаления товара из корзины
	};
	private _actions?: IActions; // Действия, связанные с элементом (например, обработчик удаления)

	// Конструктор, который принимает шаблон, события и действия
	constructor(private template: HTMLTemplateElement, actions?: IActions) {
		this._basketItem = this.cloneTemplate(); // Клонируем шаблон
		this._elements = this.setupElements(); // Инициализируем элементы
		this._actions = actions; // Присваиваем действия
		this.bindEvents(); // Привязываем события
	}
	/** Клонирует шаблон элемента корзины */
	private cloneTemplate(): HTMLElement {
		const item = this.template.content.firstElementChild?.cloneNode(
			true
		) as HTMLElement;
		if (!item) throw new Error('Не удалось клонировать шаблон BasketItem'); // Ошибка, если клонирование не удалось
		return item;
	}

	/** Инициализирует элементы внутри корзины */
	private setupElements(): {
		index: HTMLElement;
		title: HTMLElement;
		price: HTMLElement;
		buttonDelete: HTMLButtonElement;
	} {
		return {
			index: this.getElement('.basket__item-index'), // Индекс товара
			title: this.getElement('.card__title'), // Название товара
			price: this.getElement('.card__price'), // Цена товара
			buttonDelete: this.getElement<HTMLButtonElement>('.basket__item-delete'), // Кнопка удаления
		};
	}
	/** Получает элемент из корзины, кидает ошибку, если не найден */
	private getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
		const element = this._basketItem.querySelector<T>(selector);
		if (!element) throw new Error(`Элемент ${selector} не найден в шаблоне`); // Ошибка, если элемент не найден
		return element;
	}

	/** Добавляет обработчик событий (например, для удаления товара) */
	private bindEvents(): void {
		if (this._actions?.onClick) {
			// Если есть обработчик, привязываем его к кнопке удаления
			this._elements.buttonDelete.addEventListener(
				'click',
				(event: MouseEvent) => {
					event.stopPropagation(); // Останавливаем дальнейшее распространение события
					this._actions?.onClick(event); // Вызываем обработчик на кнопке
				}
			);
		}
	}

	/** Форматирует цену для отображения */
	private formatPrice(value: number | null): string {
		return value ? `${value} синапсов` : 'Без цены'; // Если цена не указана, выводим "Без цены"
	}

	/** Обновляет текстовое содержимое элемента */
	private updateText(element: HTMLElement, value: string): void {
		if (element.textContent !== value) {
			element.textContent = value;
		}
	}

	/** Рендерит элемент корзины с данными товара */
	public render(data: IProduct, index: number): HTMLElement {
		this.updateText(this._elements.index, String(index)); // Обновляем индекс товара
		this.updateText(this._elements.title, data.title); // Обновляем название товара
		this.updateText(this._elements.price, this.formatPrice(data.price)); // Обновляем цену товара
		return this._basketItem; // Возвращаем элемент корзины с обновленными данными
	}
}
