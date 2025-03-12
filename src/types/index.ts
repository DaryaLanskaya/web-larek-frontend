// Интерфейс клика мышки на элемент
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Интерфейс товара
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

//Интерфейс для вывода массива товаров
export interface IProducts {
	total: number | null;
	items: IProduct[];
}

//Интерфейс для отображения контента с карточкой товара.
export interface IProductContent {
	template: HTMLTemplateElement;
	render(product: IProduct): HTMLElement;
}

//Интерфейс для отображения страницы
export interface IPage {
	counter: number; // меняет содержимое счетчика на полученное.
	catalog: HTMLElement[]; // меняет содержмое каталога на полученные элементы.
	locked: boolean; // меняет класс обертки на значение, соответствующее переданному.
}

//Интерфейс для вывода карточек на страницу
export interface ICard {
	render(data: IProduct): HTMLElement;
}

// Интерфейс ошибки сервера
export interface IErrorMessage {
	error: string;
}

// Интерфейс корзины для товаров
export interface IBasketModel {
	add(item: Partial<IProduct>): void;
	remove(item: Partial<IProduct>): void;
	clear(): void;
	total: number;
}

// Интерфейс данных корзины для товаров
export interface IBasketContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

// Интерфейс eventEmitter - обеспечивает работу событий(слушатель событий)
export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void;
}

// Интерфейс данных для передачи в eventEmitter
export interface IEventData {
	element: HTMLElement;
	data?: Partial<IProduct>;
}

// Интерфейс успешной оплаты товара
export interface ISuccessContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

// Тип оплаты товара
export enum PaymentType {
	оnline = 'online',
	сash = 'cash',
}

// Интерфейс для описания результата заказа товара
export interface IOrderResult {
	id: string;
	total: number;
}

// Интерфейс реализует контент оформления заказа
export interface IOrderContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

// Интерфейс реализует контент контактов
export interface IContactsContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

// Формы

// Интерфейс формы оформления заказа товара
export interface IRegistrationOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

// Интерфейс валидации формы оформления заказа товара
export interface IOrderModel {
	order: IRegistrationOrder;
	isValid(order: IRegistrationOrder): boolean;
}

// Интерфейс для работы модальных окон
export interface IModalWork {
	openModal: (element: HTMLElement) => void;
	closeModal: () => void;
}

export interface IAppState {
	catalog: IProduct[];
}

// Интерфейс для продуктов
export interface IProductModel {
	products: IProduct[];
	selected: IProduct;
	setPreview(item: IProduct): void;
}
