import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    myval='899';
    handlevent(event){
        this.myval=event.detail;
        console.log(this.myval);
    }
}