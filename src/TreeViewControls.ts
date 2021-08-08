import { TreeView } from './TreeView';
import { Generatable } from './Generatable';

export class TreeViewControls<t> implements Generatable<HTMLDivElement> {
    treeView: TreeView<t>;

    addBtn: HTMLButtonElement;
    deleteBtn: HTMLButtonElement;

    constructor(treeView: TreeView<t>) {
        this.treeView = treeView;
    }

    generateElement(): HTMLDivElement {
        return this._generateControls();
    }

    _generateControls(): HTMLDivElement {
        const div = document.createElement('div');

        this.addBtn = document.createElement('button');
        this.deleteBtn = document.createElement('button');

        this.addBtn.innerText = 'Add';
        this.deleteBtn.innerText = 'Delete';

        div.append(this.addBtn, this.deleteBtn);

        return div;
    }
}
