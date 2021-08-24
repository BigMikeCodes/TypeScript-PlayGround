import { TreeView, TreeViewItem } from './TreeView';
import { MenuBar, ButtonInputConfig, buttonFromConfig } from './ControlBar';
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

        let count = 0;

        const addBtnConfig: ButtonInputConfig = {
            id: 'add-item-tree-view',
            onClick: (e: Event) => {
                const selectedItem = tree.getSelected();

                if (selectedItem) {
                    selectedItem.addChild(
                        new TreeViewItem<String>(`Dynamic Child ${count++}`)
                    );
                }
            },
            text: 'New...',
        };

        const deleteBtnConfig: ButtonInputConfig = {
            id: 'delete-selected-tree-view',
            onClick: (e: Event) => {
                tree.removeItem(tree.getSelected());
            },
            text: 'Delete Selected',
        };

        const expandBtnConfig: ButtonInputConfig = {
            id: 'expand-selected',
            onClick: () => {
                const selected = tree.getSelected();

                if (selected) {
                    selected.expand();
                }
            },
            text: 'Expand Selected',
        };

        const collapseBtnConfig: ButtonInputConfig = {
            id: 'collapse-selected',
            onClick: () => {
                const selected = tree.getSelected();

                if (selected) {
                    selected.collapse();
                }
            },
            text: 'Collapse Selected',
        };

        const expandRecursivelyBtnConfig: ButtonInputConfig = {
            id: 'expand-selected-recursively',
            onClick: () => {
                const selected = tree.getSelected();

                if (selected) {
                    selected.expand(true);
                }
            },
            text: 'Expand Selected Recursively',
        };

        const collapseRecursivelyBtnConfig: ButtonInputConfig = {
            id: 'collapse-selected-recursively',
            onClick: () => {
                const selected = tree.getSelected();

                if (selected) {
                    selected.collapse(true);
                }
            },
            text: 'Collapse Selected Recursively',
        };

        tree.addEventListener('change', () => {
            alert('change');
        });

        const treeViewButtons = [
            addBtnConfig,
            deleteBtnConfig,
            expandBtnConfig,
            collapseBtnConfig,
            expandRecursivelyBtnConfig,
            collapseRecursivelyBtnConfig,
        ];

        const treeViewControls = new MenuBar(
            ...treeViewButtons.map((config) => buttonFromConfig(config))
        );
        controlsContainer.append(treeViewControls.generateElement());
    }
}

(function () {
    WebApp.main();
})();
