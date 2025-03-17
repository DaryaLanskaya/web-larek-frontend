import { IContactsModel } from '../../types';
import { IEvents } from '../base/Events';

export class ContactsForm implements IContactsModel {
	public formElement: HTMLFormElement; // Элемент формы
	public submitButton: HTMLButtonElement; // Кнопка отправки
	public errorDisplay: HTMLElement; // Элемент для ошибок
	public emailInput: HTMLInputElement; // Поле email
	public phoneInput: HTMLInputElement; // Поле для телефона

	constructor(template: HTMLTemplateElement, private events: IEvents) {
		this.formElement = template.content
			.querySelector('.form')!
			.cloneNode(true) as HTMLFormElement; // Копируем шаблон формы
		this.submitButton = this.formElement.querySelector(
			'.button'
		)! as HTMLButtonElement; // Находим кнопку отправки
		this.errorDisplay = this.formElement.querySelector('.form__errors')!; // Элемент для отображения ошибок
		this.emailInput = this.formElement.querySelector(
			'input[name="email"]'
		)! as HTMLInputElement; // Поле email
		this.phoneInput = this.formElement.querySelector(
			'input[name="phone"]'
		)! as HTMLInputElement; // Поле phone
		this.setupEventListeners(); // Настроим обработчики событий
		this.updateSubmitButton(); // Обновляем состояние кнопки отправки
	}

	// Метод - используется для настройки обработчиков событий
	public setupEventListeners(): void {
		// Изменения в полях формы
		this.formElement.addEventListener('input', (event: Event) => {
			const input = event.target as HTMLInputElement;
			const fieldName = input.name;
			const fieldValue = input.value;
			this.events.emit('contacts:inputChanged', {
				field: fieldName,
				value: fieldValue,
			});
			this.updateSubmitButton();
		});

		//  Отправка формы
		this.formElement.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit('contacts:submit');
		});
	}

	// Метод - используется для обновления состояния кнопки отправки
	public updateSubmitButton(): void {
		const email = this.emailInput.value.trim();
		const phone = this.phoneInput.value.trim();
		const isValid = phone.length != 0 && email.length != 0;
		this.events.emit('contacts:validate', { isValid }); // Валидация
	}

	// Сеттер для установки валидности формы
	public set isValid(isValid: boolean) {
		this.submitButton.disabled = !isValid; // Включаем/выключаем кнопку отправки(состояние disabled) в зависимости от валидности
	}

	// Сеттер для отображения ошибок
	public set errorMessages(messages: string[]) {
		this.errorDisplay.textContent = messages.join('; '); // Отображаем все сообщения об ошибках через точку с запятой
	}

	// Метод - используется для рендеринга формы
	public render(): HTMLElement {
		return this.formElement; // Возвращаем саму форму - которую нужно отрисовать
	}
}
