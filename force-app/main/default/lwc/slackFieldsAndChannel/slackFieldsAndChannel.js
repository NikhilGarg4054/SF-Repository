import { LightningElement,api,wire} from 'lwc';
import slack from '@salesforce/apex/SlackFieldsAndChannels.slack';
export default class PostToSlack extends LightningElement {  
    selectedvalue=[];
    @api recordId;
    result;
    error;

    //For Fields
    
    options=[{'label':'Name','value':'Name'},{"label":'Amount','value':'Amount'},{"label":"Closedate",'value':'Closedate'},{'label':'Stagename','value':'Stagename'}];
   
    change(event){
        /*this.selectedvalue.push(event.detail.value);*/
        console.log('recordId'+this.recordId);
        this.selectedvalue=event.detail.value;
        console.log(this.selectedvalue);    
    }
    
    // For Channels

    options2=[{'label':'general','value':'general'},{'label':'opportunity','value':'opportunity'}];
    value;
    handlechange(event){
      this.value=event.target.value;
      console.log(this.value);
    }
    handleclick(event){
      slack({values1:this.selectedvalue,id2:this.recordId,val:this.value})
      .then(result=>{
        this.result=result;
      })
      .catch(error=>
       {
         this.error=error;
       })
     }
  
}