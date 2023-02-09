import {Panel} from "./Panel.js";
import {ProjectConfig} from "../ProjectConfig.js";
import {LibraryItemPreview} from "./LibraryItemPreview.js";
import {LibraryItemListElement} from "./LibraryItemListElement.js";
import {LibraryItemsList} from "./LibraryItemsList.js";


export class Library extends Panel {

	#projectConfig = new ProjectConfig();
	#preview = new LibraryItemPreview();
	#itemsList = new LibraryItemsList();

	constructor() {
		super("Library");

		this.id = "library";

		this.#projectConfig.addEventListener("MEDIA_IMPORTED", (event) => {
			const imports = this.#projectConfig.lastImports;
			imports.forEach((file) => {
				const libraryItemListElement = new LibraryItemListElement(file);
				this.#itemsList.subPanelContainer.append(libraryItemListElement);
			});
		});


		this.#itemsList.addEventListener("LIBRARY_ITEM_SELECTED", (event) => {
			const selectedItem = event.target;
			const lastSelectedItem = this.#itemsList.selectedItem;

			event.preventDefault();

			if(selectedItem === lastSelectedItem) {
				return;
			}

			const image = new Image();

			this.#removePreviewImage();

			image.src = URL.createObjectURL(selectedItem.file);
			lastSelectedItem?.classList.remove("selected");
			selectedItem.classList.add("selected");
			this.#preview.append(image);
		});

		this.addEventListener("LIBRARY_ITEM_REMOVED", (event) => {
			if(!this.#itemsList.subPanelContainer.children.length) {
				this.#removePreviewImage();
			}
		});

		this.panelsContainer.append(this.#preview, this.#itemsList);
	}


	#removePreviewImage() {
		const image = this.#preview.children[0];
		if(image) {
			URL.revokeObjectURL(image.src);
			image.remove();
		}
	}
}

customElements.define("library-el", Library);