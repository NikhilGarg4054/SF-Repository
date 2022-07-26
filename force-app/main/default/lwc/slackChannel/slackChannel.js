import { LightningElement,wire } from 'lwc';
export default class SlackChannel extends LightningElement {
   

Click(event){
    console.log(this.c);
    console.log(JSON.stringify(this.c));
}
}