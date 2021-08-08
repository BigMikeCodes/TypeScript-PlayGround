import { Generatable } from "./Generatable";

export class MenuBar implements Generatable<HTMLDivElement>{

    controls: Array<HTMLElement>

    constructor(...menuBarControlConfig:Array<HTMLElement>){
        this.controls = menuBarControlConfig;
    }

    addControl(control: HTMLElement){
        this.controls.push(control);
    }

    generateElement():HTMLDivElement{
        const div = document.createElement('div');

        this.controls.forEach(control=>div.append(control));

        return div;
    }

}


export interface InputConfig{
    id?: string,
    classList?: Array<string>
};

export interface ButtonInputConfig extends InputConfig{
    onClick?: EventListener,
    text?: string
};


export function buttonFromConfig(buttonConfig: ButtonInputConfig){

    const btn = document.createElement('button');

    if(buttonConfig.id){
        btn.id = buttonConfig.id;
    }

    if(buttonConfig.classList){
        btn.classList.add(...buttonConfig.classList);
    }

    if(buttonConfig.onClick){
        btn.addEventListener('click',buttonConfig.onClick);
    }

    if(buttonConfig.text){
        btn.innerText = buttonConfig.text;
    }


    return btn;

}