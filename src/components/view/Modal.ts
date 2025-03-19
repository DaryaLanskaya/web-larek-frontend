import { IEvents } from '../base/Events';
import { IModalWork } from '../../types';

export class Modal implements IModalWork {
	protected сontainerModal: HTMLElement; // Контейнер модального окна
	protected buttonClose: HTMLButtonElement; // Кнопка закрытия
	protected _content: HTMLElement; // Контент модального окна
	constructor(сontainerModal: HTMLElement, protected events: IEvents) {
		this.сontainerModal = сontainerModal; // Контейнер модального окна
		this.buttonClose = сontainerModal.querySelector('.modal__close'); // Кнопка закрытия
		this._content = сontainerModal.querySelector('.modal__content'); // Контент модального окна// Wrapper страницы
		this.buttonClose.addEventListener('click', this.close.bind(this));
		this.сontainerModal.addEventListener('click', this.close.bind(this));
		this.сontainerModal
			.querySelector('.modal__container')
			.addEventListener('click', (event) => event.stopPropagation()); // stopPropagation - функция прекращает дальнейшую передачу текущего события
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value); // replaceChildren - заменяет существующие дочерние элементы Node на заданный новый набор дочерних элементов
	}

	open() {
		this.сontainerModal.classList.add('modal_active'); // Открытие модального окна
		this.events.emit('modal:open');
	}

	close() {
		this.сontainerModal.classList.remove('modal_active'); // Закрытие модального окна
		this.content = null;
		this.events.emit('modal:close');
	}

	// Рендер модального окна
	render(): HTMLElement {
		this._content;
		this.open();
		return this.сontainerModal;
	}
}
