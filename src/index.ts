import { TreeView, TreeViewChangeDetail, TreeViewItem } from './TreeView';
import { MenuBar, ButtonInputConfig, buttonFromConfig } from './ControlBar';
import { Client } from '../node_modules/@stomp/stompjs/esm6/client';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { basicSetup } from '@codemirror/basic-setup';
import { ContentRepository, ProjectNode } from './api/ContentRepository';
import {
    ProjectTreeView,
    ProjectTreeViewChangeDetail,
    ProjectTreeViewItem,
} from './ProjectTreeView';

class WebApp {
    static async main(): Promise<void> {
        const editorParent: HTMLElement =
            document.getElementById('editor-parent');

        const startState = EditorState.create({
            doc: 'Hello world',
            extensions: [keymap.of(defaultKeymap), basicSetup],
        });

        const view = new EditorView({
            state: startState,
            parent: editorParent,
        });

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

        tree.addEventListener(
            'change',
            (event: CustomEvent<TreeViewChangeDetail<String>>) => {
                const detail = event.detail;

                if (detail.old) {
                    detail.old.deSelect();
                }
                detail.new.select();
            }
        );

        const editorChangeSetBtn: ButtonInputConfig = {
            id: 'get-editor-change-set',
            onClick: () => {
                const changes = view.state.changes({ from: 0 });
                console.log(changes.toJSON());
            },
            text: 'Get Change Set',
        };

        const treeViewButtons = [
            addBtnConfig,
            deleteBtnConfig,
            expandBtnConfig,
            collapseBtnConfig,
            expandRecursivelyBtnConfig,
            collapseRecursivelyBtnConfig,
            editorChangeSetBtn,
        ];

        const treeViewControls = new MenuBar(
            ...treeViewButtons.map((config) => buttonFromConfig(config))
        );
        controlsContainer.append(treeViewControls.generateElement());

        const projectTreeView = await WebApp.setUpProject();

        const projectTreeViewContainer =
            document.querySelector('#project-container');
        projectTreeViewContainer.append(projectTreeView.generateElement());
    }

    static async setUpProject(): Promise<ProjectTreeView> {
        const projectGuid = '8486e895-e43b-42bf-843a-92a1ffae2cc2';
        const project = await ContentRepository.getProject(projectGuid);

        const projectTreeView = ProjectTreeView.fromProject(project);

        projectTreeView.addEventListener(
            'change',
            (event: CustomEvent<ProjectTreeViewChangeDetail>) => {
                const detail = event.detail;

                const newValue: ProjectNode = detail.new.getValue();

                console.log(newValue.metaData.path);
            }
        );

        return projectTreeView;
    }
}

(function () {
    WebApp.main();
})();
