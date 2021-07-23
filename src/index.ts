import {TreeView,TreeViewItem} from './TreeView';

class WebApp{

    static main(){
        alert("hello");

        const root = new TreeViewItem<Number>(1);

        const tree = new TreeView<Number>(root);
    
    }
}

(function(){
   WebApp.main();
})();