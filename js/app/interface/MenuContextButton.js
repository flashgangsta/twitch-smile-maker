import {Button} from "./Button.js";

export class MenuContextButton extends Button {
	constructor(label, data) {
		super(label);

		if(data.handler) {
			//todo: dispose it
			this.addEventListener("click", () => data.handler());
		}
	}
}

customElements.define("menu-context-button-el", MenuContextButton);