enum NodeType {
    DIRECTORY = 'DIRECTORY',
    PLAIN_TEXT = 'PLAIN_TEXT',
}

interface MetaData {
    lastEdit: Number;
    created: Number;
    path: String;
    repositoryUUID: String;
    name: String;
    size?: Number;
    mediaType?: String;
}

interface ProjectNode {
    type: NodeType;
    children: Array<ProjectNode>;
}

interface Project {
    id: String;
    owner: String;
    name: String;
    location: String;
    created: Array<String>;
    lastEdit: Array<String>;
    structure: Array<ProjectNode>;
}

class ContentRepository {
    static getProjectStructure() {}
}
