import { LightningElement, api, wire } from 'lwc';
import getContactData from '@salesforce/apex/fileUpload.getContactRecords';
import{NavigationMixin} from 'lightning/navigation';
export default class flipContactCard extends NavigationMixin(LightningElement) {
    @api recordId;
    data
    @wire(getContactData, {accountId : '$recordId'}) contactData;

    addClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.add('class1');
    }

    removeClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.remove('class1');
    }

    handleClick(event){
       console.log(event.target.dataset.targetId);
       
            event.preventDefault();
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId:event.target.dataset.targetId,
                    objectApiName:'Contact',
                    actionName:'view'
    
                }
            })
        }
    }
   