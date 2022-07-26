import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    checkvar=false;
    handlechange(event){
        this.checkvar=event.target.checked;
    }
}