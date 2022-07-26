import { LightningElement } from 'lwc';
import create from '@salesforce/apex/RelatedRecord.create';
export default class Contacts extends LightningElement {
recordId;
lastname;
email;
birthday;
phone;
handleclick(event){
    event.preventDefault();
    this.lastname=this.template.querySelector(".inp1").value;
    this.email=this.template.querySelector(".inp2").value;
    this.birthday=this.template.querySelector(".inp3").value;
    this.phone=this.template.querySelector(".inp4").value;
    console.log(this.birthday+this.email+this.lastname+this.phone);
    create({name:this.lastname,email:this.email,d:this.birthday,num:this.phone,recordId:this.recordId});
}
}