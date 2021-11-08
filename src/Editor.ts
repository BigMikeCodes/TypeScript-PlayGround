import { basicSetup } from '@codemirror/basic-setup';
import { defaultKeymap } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { Generatable } from './Generatable';

export class DocumentEditor implements Generatable<HTMLElement> {
    editorView: EditorView;

    constructor() {
        this.editorView = null;
    }

    generateElement() {
        const editorParent = document.createElement('div');

        const startState = EditorState.create({
            extensions: [keymap.of(defaultKeymap), basicSetup],
        });

        this.editorView = new EditorView({
            parent: editorParent,
            state: startState,
        });

        return editorParent;
    }
}
