import { LightningElement,api,wire} from 'lwc';
import getlist from '@salesforce/apex/PostToSlack.getlist';
export default class PostToSlack extends LightningElement {  
    selectedvalue=[];
    @api recordId;
    result;
    error;
    options=[{'label':'Name','value':'Name'},{"label":'Amount','value':'Amount'},{"label":"Closedate",'value':'Closedate'},{'label':'Stagename','value':'Stagename'}];
   
    change(event){
        /*this.selectedvalue.push(event.detail.value);*/
        console.log('recordId'+this.recordId);
        this.selectedvalue=event.detail.value;
        console.log(this.selectedvalue);    
    }
    
    
    handleclick(event){
      getlist({values1:this.selectedvalue,id2:this.recordId})
      .then(result=>{
        this.result=result;
      })
      .catch(error=>
       {
         this.error=error;
       })
     }
  
}