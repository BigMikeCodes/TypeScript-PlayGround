class TreeView<t>{
    
    root: TreeViewItem<t>;

    constructor(root: TreeViewItem<t>){
        this.root = root;
    }

}

class TreeViewItem<t>{

    parent: TreeViewItem<t>;
    children: Array<TreeViewItem<t>>;
    value: t; 

    constructor(value: t){
        this.children = new Array();
        this.parent   = null;
        this.value    = value;
    }

    addChild(child: TreeViewItem<t>): void{
        this.children.push(child);

    }

    setParent(parent: TreeViewItem<t>){
        this.parent = parent;
    }
}

export{TreeView,TreeViewItem};