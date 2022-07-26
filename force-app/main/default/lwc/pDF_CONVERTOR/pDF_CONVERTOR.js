import { LightningElement,api } from 'lwc';

export default class PDF_CONVERTOR extends LightningElement {
    
    @api recordId;
    siteUrl;
    handleclick(event){
        console.log('recordId'+this.recordId);
        //this.siteUrl='/apex/PDF_MUTLIOBJECT?recId='+this.recordId;
        this.siteUrl='https://credex-e-dev-ed--c.visualforce.com/apex/PDF_MUTLIOBJECT?lwcid='+this.recordId;
     
    }
    connectedCallback(){
        setTimeout(() => {
            console.log(this.recordId+'callback');
            console.log('recordId'+this.recordId);
            //this.siteUrl='/apex/PDF_MUTLIOBJECT?recId='+this.recordId;
            this.siteUrl='https://credex-e-dev-ed--c.visualforce.com/apex/PDF_MUTLIOBJECT?lwcid='+this.recordId;
        }, 5);
    }
}