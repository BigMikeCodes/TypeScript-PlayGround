import { NodeType, Project, ProjectNode } from './api/ContentRepository';
import { TreeView, TreeViewItem } from './TreeView';

export class ProjectTreeViewItem extends TreeViewItem<ProjectNode> {
    constructor(value: ProjectNode) {
        super(value);
    }

    generateElement(): HTMLLIElement {
        let title = this.value.metaData.name;

        if (this.value.type === NodeType.PLAIN_TEXT) {
            title = `${this.value.metaData.name} (${this.value.metaData.size})`;
        }

        // console.log();

        this.a.addEventListener('click', () => this._emitClick());
        this.a.append(document.createTextNode(title));

        this.children.forEach((child) => {
            this.ul.append(child.generateElement());
        });

        this.shown = true;
        return this.li;
    }
}

export class ProjectTreeView extends TreeView<ProjectNode> {
    constructor(root: ProjectTreeViewItem) {
        super(root);
    }

    static fromProject(project: Project): ProjectTreeView {
        const root = new ProjectTreeViewItem(null);
        project.structure.forEach((projectNode: ProjectNode) =>
            ProjectTreeView._recursivelyCreateItems(root, projectNode)
        );
        return new ProjectTreeView(root);
    }

    static _recursivelyCreateItems(
        parent: ProjectTreeViewItem,
        projectNode: ProjectNode
    ): void {
        const newNode = new ProjectTreeViewItem(projectNode);
        parent.addChild(newNode);
        projectNode.children.forEach((child) =>
            ProjectTreeView._recursivelyCreateItems(newNode, child)
        );
    }
}
