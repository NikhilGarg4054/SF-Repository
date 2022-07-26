import { LightningElement,wire,api } from 'lwc';
import getId from '@salesforce/apex/FilePreview.getId';
import {NavigationMixin} from 'lightning/navigation';
export default class PreviewandDownloadFile extends NavigationMixin(LightningElement) {
    @api recordId;
    filelist=[];
    @wire(getId,{recordId:'$recordId'})
    WiredResult({data,error}){
        if(data){
            console.log(data);
            this.filelist=Object.keys(data).map(item=>({"label":data[item],
            "value": item,
            "url":`/sfc/servlet.shepherd/document/download/${item}`
           }))
           console.log(this.filesList)
        }
        if(error){
            console.log('error'+error);
        }    
    }
    handlePreview(event){
        this[NavigationMixin.Navigate]({

            
            type:'standard__namedPage',
            attributes:{
                pageName:'filePreview'
            },
            state:{
                selectedRecordId:event.target.dataset.id
            }
        })
    }

}