import { LightningElement } from 'lwc';

export default class Onewaybinding extends LightningElement {
    val='nikhil';
    change(event){
        this.val=event.target.value;
        console.log(this.val);
    }
}