export class ContentApi{

    private static async getContent(path: string): Promise<Response>{
        const url = `http://127.0.0.1:8006/api/content/get${path}`; 
        return fetch(url,{method: 'GET'});
    }

    static async getPlainText(path: string): Promise<string>{

        const response = await ContentApi.getContent(path);
        return await response.text();

    }

}