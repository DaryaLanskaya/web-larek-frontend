import { IEvents } from '../base/Events';
import { IModalWork } from '../../types';

export class Modal implements IModalWork {
	protected сontainerModal: HTMLElement; // контейнер модального окна
	protected buttonClose: HTMLButtonElement; // кнопка закрытия
	protected _content: HTMLElement; // контент модального окна
	protected _wapperPage: HTMLElement; // wrapper страницы

	constructor(сontainerModal: HTMLElement, protected events: IEvents) {
		this.сontainerModal = сontainerModal;
		this.buttonClose = сontainerModal.querySelector('.modal__close');
		this._content = сontainerModal.querySelector('.modal__content');
		this._wapperPage = document.querySelector('.page__wrapper');
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
		this.сontainerModal.classList.add('modal_active'); // открытие модального окна
		this.events.emit('modal:open');
	}

	close() {
		this.сontainerModal.classList.remove('modal_active'); // закрытие модального окна
		this.content = null;
		this.events.emit('modal:close');
	}

	set locked(value: boolean) {
		if (value) {
			this._wapperPage.classList.add('page__wrapper_locked');
		} else {
			this._wapperPage.classList.remove('page__wrapper_locked');
		}
	}

	render(): HTMLElement {
		// рендер модального окна
		this._content;
		this.open();
		return this.сontainerModal;
	}
}
