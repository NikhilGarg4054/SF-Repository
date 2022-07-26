import { LightningElement } from 'lwc';
import method from '@salesforce/apex/ReturnRecords.method';
export default class RecordOnBasisofObject extends LightningElement {
    objects=[{label:'Account',value:'Account'},{label:'Contact',value:'Contact'},{label:'Lead',value:'Lead'},{label:'Opportunity',value:'Opportunity'}];
    
    result;

    cols=[{label:'Id',fieldName:'Id'},{label:'Name',fieldName:'Name'}];


    handlechange(event){ 
      method({obj:event.target.value})
      .then((result)=>{
          this.result=result;
      })
      .catch((error)=>{
          this.result=error;
      })
    }
}