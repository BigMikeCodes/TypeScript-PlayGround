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

    getRoot(): TreeViewItem<t>{
        return this.root;
    }

    getSelected() {}

    generateElement(): HTMLUListElement {
        const ul = document.createElement('ul');

        this.root.getChildren().forEach(child=>ul.append(child.generateElement()));

        return ul;
    }

}

class TreeViewItem<t> extends EventTarget implements Generatable<HTMLLIElement>{

    parent: TreeViewItem<t>;
    children: Array<TreeViewItem<t>>;
    value: t;
    li: HTMLLIElement;
    ul: HTMLUListElement;

    constructor(value: t) {
        super();
        this.children = new Array();
        this.parent   = null;
        this.value    = value;

        this.li = document.createElement('li');
        this.ul = document.createElement('ul');
    }

    getChildren(): Array<TreeViewItem<t>>{
        return this.children;
    }

    generateElement(): HTMLLIElement {
        const a = document.createElement('a');
        console.log(a);
        a.append(document.createTextNode(this.value.toString()));

        a.addEventListener('click',()=>this._emitClick());
        
        this.children.forEach(child=>this.ul.append(child.generateElement()));


        this.li.append(a,this.ul);
        return this.li;
    }

    getValue(): t {
        return this.value;
    }

    addChild(child: TreeViewItem<t>): void {
        this.children.push(child);

        child.addEventListener('click',()=>{
            console.log('blah');
        },true);
    }

    setParent(parent: TreeViewItem<t>) {
        this.parent = parent;
    }

    _emitClick(): void {
        this.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    }
}

export { TreeView, TreeViewItem };
