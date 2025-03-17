import { IFormModel, IOrderInfo, errorsForm } from '../../types';
import { IEvents } from '../base/Events';

export class FormModel implements IFormModel {
	public payment: string = ''; // Способ оплаты(изначальное значение)
	public email: string = ''; // Email(изначальное значение)
	public phone: string = ''; // Телефон(изначальное значение)
	public address: string = ''; // Адрес(изначальное значение)
	private errorsForm: errorsForm = {}; // Ошибки формы

	constructor(private events: IEvents) {}

	// Устанавливаем адрес
	public setOrderAddress(field: string, value: string): void {
		if (field === 'address') {
			this.address = value; // Присваиваем значение для адреса
		}
		this.validateOrder(); // Валидация данных заказа
	}

	// Валидация данных заказа
	public validateOrder(): boolean {
		const errors: errorsForm = {}; // Ошибки формы
		if (!this.address) {
			errors.address = 'Нужно указать адрес'; // Если поле с адресом пустое
		}
		if (!this.payment) {
			errors.payment = 'Выберите подходящий способ оплаты'; // Если способ оплаты не выбрали
		}
		this.errorsForm = errors; // Обновление ошибок формы
		this.events.emit('errorsForm:change', this.errorsForm); // Эмитируем изменения ошибок
		return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
	}

	// Устанавливаем данные для контактов
	public setOrderData(field: string, value: string): void {
		if (field === 'email') {
			this.email = value; // Присваиваем значение для email
		} else if (field === 'phone') {
			this.phone = value; // Присваиваем значение для телефона
		}
		this.validateContacts(); // Валидация контактных данных
	}

	// Валидация контактных данных
	public validateContacts(): boolean {
		const errors: errorsForm = {}; // Ошибки формы
		if (!this.email) {
			errors.email = 'Нужно указать email'; // Если поле с email не заполнили
		}

		if (!this.phone) {
			errors.phone = 'Нужно указать телефон'; // Если поле с телефоном не заполнили
		}
		this.errorsForm = errors; // Обновление ошибок формы
		this.events.emit('errorsForm:change', this.errorsForm); // Эмитируем изменения ошибок
		return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
	}

	// Установка способа оплаты
	public setPayment(payment: string): void {
		this.payment = payment; // Присваиваем способ оплаты
		this.validateOrder(); // Валидация данных заказа
	}

	// Получение объекта заказа для отправки
	public getOrder(): Omit<IOrderInfo, 'total' | 'items'> {
		const orderRes: Omit<IOrderInfo, 'total' | 'items'> = {
			payment: this.payment, // Способ оплаты
			email: this.email, // Email
			phone: this.phone, // Телефон
			address: this.address, // Адрес
		};
		return orderRes;
	}

	// Получить ошибки формы
	public getErrors(): errorsForm {
		return this.errorsForm;
	}
}
