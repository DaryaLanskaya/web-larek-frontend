import { IFormModel, IOrderInfo, errorsForm } from '../../types';
import { IEvents } from '../base/Events';

export class FormModel implements IFormModel {
	public payment: string = ''; // Начальное значение для способа оплаты
	public email: string = ''; // Начальное значение для email
	public phone: string = ''; // Начальное значение для телефона
	public address: string = ''; // Начальное значение для адреса
	private errorsForm: errorsForm = {}; // Ошибки формы

	// Конструктор, принимает объект событий для обработки событий в модели
	constructor(private events: IEvents) {
		// Удаляем вызов setupEventListeners, так как модель не должна заниматься обработкой событий
	}

	// Установить адрес
	public setOrderAddress(field: string, value: string): void {
		if (field === 'address') {
			this.address = value; // Присваиваем значение для адреса
		}
		this.validateOrder(); // Проверяем правильность данных заказа
	}

	// Валидация данных заказа
	public validateOrder(): boolean {
		const errors: errorsForm = {}; // Ошибки формы
		if (!this.address) {
			errors.address = 'Необходимо указать адрес'; // Если адрес пустой
		}
		if (!this.payment) {
			errors.payment = 'Выберите способ оплаты'; // Если способ оплаты не выбран
		}
		this.errorsForm = errors; // Обновляем ошибки формы
		this.events.emit('formErrors:change', this.errorsForm); // Эмитируем изменения ошибок
		return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
	}

	// Устанавливаем данные для контактов
	public setOrderData(field: string, value: string): void {
		if (field === 'email') {
			this.email = value; // Присваиваем значение для email
		} else if (field === 'phone') {
			this.phone = value; // Присваиваем значение для телефона
		}
		this.validateContacts(); // Проверяем правильность контактных данных
	}

	// Валидация контактных данных
	public validateContacts(): boolean {
		const errors: errorsForm = {}; // Ошибки формы
		if (!this.email) {
			errors.email = 'Нужно указать email'; // Если email пустой
		}

		if (!this.phone) {
			errors.phone = 'Нужно указать телефон'; // Если телефон пустой
		}
		this.errorsForm = errors; // Обновляем ошибки формы
		this.events.emit('formErrors:change', this.errorsForm); // Эмитируем изменения ошибок
		return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
	}

	// Установить способ оплаты
	public setPayment(payment: string): void {
		this.payment = payment; // Присваиваем способ оплаты
		this.validateOrder(); // Проверяем правильность данных заказа
	}

	// Получить объект заказа для отправки
	public getOrder(): Omit<IOrderInfo, 'total' | 'items'> {
		const orderRes: Omit<IOrderInfo, 'total' | 'items'> = {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
		};
		return orderRes;
	}

	// Получить ошибки формы
	public getErrors(): errorsForm {
		return this.errorsForm;
	}
}
