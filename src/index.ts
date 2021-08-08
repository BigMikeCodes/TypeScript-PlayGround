import { TreeView, TreeViewItem } from './TreeView';
import { TreeViewControls } from './TreeViewControls';
import { MenuBar,ButtonInputConfig, buttonFromConfig } from './ControlBar';
import { Client } from '../node_modules/@stomp/stompjs/esm6/client';

class WebApp {
    static main(): void {
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

        const controlsContainer = document.querySelector(
            '#tree-view-controls-container'
        );
        
        // const treeViewControls = new TreeViewControls(tree);

        const addBtnConfig: ButtonInputConfig = {
            id: 'add-item-tree-view',
            onClick: (e: Event)=>{console.log('add item clicked')},
            text: 'New...'
        }  

        const deleteBtnConfig: ButtonInputConfig ={
            id: 'delete-selected-tree-view',
            onClick: (e: Event) => {console.log('delete clicked');},
            text: 'Delete Selected'
        }

        const treeViewButtons = [
            addBtnConfig,
            deleteBtnConfig
        ];

        const treeViewControls = new MenuBar(...treeViewButtons.map(config=>buttonFromConfig(config)));
        controlsContainer.append(treeViewControls.generateElement());
    }
}

(function () {
    WebApp.main();
})();
