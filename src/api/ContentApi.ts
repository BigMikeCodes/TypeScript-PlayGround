export class Content{

    private static async getContent(path: string): Promise<Response>{
        const url = `http://127.0.0.1:8006/api/content/get${path}`; 
        return fetch(url,{method: 'GET'});
    }


    static async clear(path: string): Promise<string>{

        const response = await Content.getContent(path);
        return await response.text();

    }


}