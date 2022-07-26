import { LightningElement } from 'lwc';

export default class Child extends LightningElement {
    val;
    handlechange(event){
        this.val=event.target.value;
        //console.log(this.val);
        this.dispatchEvent(new CustomEvent('myevent',{detail:this.val}));
    }
}