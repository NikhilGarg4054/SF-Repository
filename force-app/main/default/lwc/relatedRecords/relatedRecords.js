import { LightningElement,api } from 'lwc';
import create from '@salesforce/apex/RelatedRecord.create';
export default class relatedRecords extends LightningElement {
 @api recordId;
lastname;
email;
birthday;
phone;
result;
handleclick(event){
    event.preventDefault();
    this.lastname=this.template.querySelector(".inp1").value;
    this.email=this.template.querySelector(".inp2").value;
    this.birthday=this.template.querySelector(".inp3").value;
    this.phone=this.template.querySelector(".inp4").value;
    console.log(this.birthday+this.email+this.lastname+this.phone);
    console.log(this.recordId);
    create({name:this.lastname,email:this.email,d:this.birthday,num:this.phone,recordId:this.recordId})
    .then((result)=>{
        this.result=result;
    })
    .catch((error)=>{
        this.result=error;
    });
}
}