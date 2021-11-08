export enum NodeType {
    DIRECTORY = 'DIRECTORY',
    PLAIN_TEXT = 'PLAIN_TEXT',
}

export interface MetaData {
    lastEdit: number;
    created: number;
    path: string;
    repositoryUUID: string;
    name: string;
    size?: number;
    mediaType?: string;
}

export interface ProjectNode {
    type: NodeType;
    children: Array<ProjectNode>;
    metaData: MetaData;
}

export interface Project {
    id: String;
    owner: String;
    name: String;
    location: String;
    created: Array<String>;
    lastEdit: Array<String>;
    structure?: Array<ProjectNode>;
}

const PORT = 8006;
const ADDRESS = 'http://127.0.0.1';

export class ContentRepository {
    static async getProject(projectId: String): Promise<Project> {
        const url = `${ADDRESS}:${PORT}/api/project/${projectId}/structure`;
        const response = await fetch(url, { method: 'GET' });

        if (response.ok) {
            return (await response.json()) as Project;
        }
    }
}
