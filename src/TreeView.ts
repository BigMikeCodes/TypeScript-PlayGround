import { Generatable } from './Generatable.js';

class TreeView<t> implements Generatable<HTMLUListElement>{

    root: TreeViewItem<t>;
    selected: TreeViewItem<t>;

    constructor(root: TreeViewItem<t>) {
        this.root = root;
        this.root.addEventListener('click', (e) => {
            console.log('hello!');

        });
    }

    getSelected() {}

    generateElement(): HTMLUListElement {
        const ul = document.createElement('ul');

        this.root.generateElement();

        this.root.getChildren().forEach(child=>ul.append(child.generateElement()));

        return ul;
    }

}

class TreeViewItem<t> extends EventTarget implements Generatable<HTMLLIElement>{

    parent: TreeViewItem<t>;
    children: Array<TreeViewItem<t>>;
    value: t;

    constructor(value: t) {
        super();

        this.children = new Array();
        this.parent = null;
        this.value = value;
    }

    getChildren(): Array<TreeViewItem<t>>{
        return this.children;
    }

    generateElement(): HTMLLIElement {
        const li = document.createElement('li');

        li.append(document.createTextNode('Test'));

        return li;
    }

    getValue(): t {
        return this.value;
    }

    addChild(child: TreeViewItem<t>): void {
        this.children.push(child);
    }

    setParent(parent: TreeViewItem<t>) {
        this.parent = parent;
    }

    _emitClick(): void {
        this.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    }
}

export { TreeView, TreeViewItem };
