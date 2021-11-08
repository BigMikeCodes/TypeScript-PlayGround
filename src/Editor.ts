import { EditorView } from '@codemirror/view';
import { Generatable } from './Generatable';

export class DocumentEditor implements Generatable<HTMLElement> {
    editorView: EditorView;

    constructor() {
        this.editorView = null;
    }

    generateElement() {
        const editorParent = document.createElement('div');

        this.editorView = new EditorView({
            parent: editorParent,
        });

        return editorParent;
    }
}
