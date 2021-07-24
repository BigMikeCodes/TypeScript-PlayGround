import {TreeView,TreeViewItem} from './TreeView.js';

class WebApp{

    static main(){

        const root = new TreeViewItem<String>('root');

        const child1 = new TreeViewItem<String>('child1');
        const child2 = new TreeViewItem<String>('child2');
        const child3 = new TreeViewItem<String>('child3');
        const child4 = new TreeViewItem<String>('child4');

        root.addChild(child1);
        child1.addChild(child2);
        child1.addChild(child3);
        child3.addChild(child4);

        const tree = new TreeView<String>(root);
        
        const container = document.querySelector('#tree-view-container');
        container.append(tree.generateElement());

    }
}

(function(){
   WebApp.main();
})();