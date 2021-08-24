import { Generatable } from './Generatable.js';
import { DISPLAY_NONE } from './CssClasses';

const BUBBLE = '_bubble';

export class TreeView<t>
    extends EventTarget
    implements Generatable<HTMLUListElement>
{
    root: TreeViewItem<t>;
    selected: TreeViewItem<t>;

    constructor(root: TreeViewItem<t>) {
        super();

        this.root = root;
        this.root.addEventListener(BUBBLE, (e: CustomEvent) => {
            this.selected = e.detail;
            this.dispatchEvent(
                new CustomEvent('change', { detail: this.selected })
            );
        });
    }

    getRoot(): TreeViewItem<t> {
        return this.root;
    }

    getSelected(): TreeViewItem<t> {
        return this.selected;
    }

    generateElement(): HTMLUListElement {
        const ul = document.createElement('ul');

        this.root
            .getChildren()
            .forEach((child) => ul.append(child.generateElement()));

        return ul;
    }

    removeItem(item: TreeViewItem<t>) {
        if (item) {
            if (this.getSelected() === item) {
                this.selected = null;
            }
            item.remove();
        }
    }
}

export class TreeViewItem<t>
    extends EventTarget
    implements Generatable<HTMLLIElement>
{
    parent: TreeViewItem<t>;
    children: Set<TreeViewItem<t>>;
    value: t;
    li: HTMLLIElement;
    ul: HTMLUListElement;
    shown: boolean;

    constructor(value: t) {
        super();
        this.children = new Set();
        this.parent = null;
        this.value = value;

        this.li = document.createElement('li');
        this.ul = document.createElement('ul');

        this.shown = false;
    }

    getChildren(): Set<TreeViewItem<t>> {
        return this.children;
    }

    generateElement(): HTMLLIElement {
        const a = document.createElement('a');
        console.log(a);
        a.append(document.createTextNode(this.value.toString()));

        a.addEventListener('click', () => this._emitClick());

        this.children.forEach((child) =>
            this.ul.append(child.generateElement())
        );

        this.li.append(a, this.ul);
        this.shown = true;
        return this.li;
    }

    getValue(): t {
        return this.value;
    }

    addChild(child: TreeViewItem<t>): void {
        this.children.add(child);
        child.setParent(this);

        child.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent(BUBBLE, { detail: child }));
        });

        child.addEventListener(BUBBLE, (e: CustomEvent) => {
            this.dispatchEvent(new CustomEvent(BUBBLE, { detail: e.detail }));
        });

        if (this.shown) {
            this.ul.append(child.generateElement());
        }
    }

    setParent(parent: TreeViewItem<t>) {
        this.parent = parent;
    }

    _emitClick(): void {
        this.dispatchEvent(new CustomEvent('click'));
    }

    remove() {
        this.li.remove();
        this.ul.remove();
        this.parent.removeChild(this);
    }

    removeChild(treeViewItem: TreeViewItem<t>): Boolean {
        return this.children.delete(treeViewItem);
    }

    _hideChildren(hide: Boolean) {
        if (hide) {
            this.ul.classList.add(DISPLAY_NONE);
        } else {
            this.ul.classList.remove(DISPLAY_NONE);
        }
    }

    collapse(recursively: Boolean = false) {
        if (recursively) {
            this.children.forEach((child) => child.collapse(true));
        }

        this._hideChildren(true);
    }

    expand(recursively: Boolean = false) {
        if (recursively) {
            this.children.forEach((child) => child.expand(true));
        }

        this._hideChildren(false);
    }
}
