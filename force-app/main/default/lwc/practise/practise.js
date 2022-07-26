import { LightningElement,api } from 'lwc';

export default class Practise extends LightningElement {
    @api recordId;
    click(){
        console.log('recordId'+this.recordId);
        console.log('nikhil');
    }
}