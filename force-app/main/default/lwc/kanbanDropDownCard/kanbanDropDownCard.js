import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class KanbanDropDownCard extends NavigationMixin(LightningElement) {
    @api stage;
    @api record;
   /* connectedCallback(){
        console.log(this.record.accountId+' '+this.record.accountName);
    }*/
    get isStageName(){
      // console.log('nikhil garg');
        console.log('record card'+JSON.stringify(this.record))
        console.log(this.stage+'card stage');
        return this.stage === this.record.Status__c
        
    }
    
    itemdragStart(){
        let event =new CustomEvent('itemdrag',{
        detail:this.record.Id}
        )
        console.log('card component RecordId'+this.record.Id);
        this.dispatchEvent(event);
    }
    handleClick(event){
        console.log(event.target.dataset.targetId);
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.targetId,
                objectApiName:'Task__c',
                actionName:'view'
            }
        })
    }
    handleAccountId(event){
        console.log(event.target.dataset.targetId);
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.targetId,
                objectApiName:'Project__c',
                actionName:'view'

            }
        })
    }
}