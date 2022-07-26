import { LightningElement } from 'lwc';
import create from '@salesforce/apex/saveRecord.create';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import uId from '@salesforce/user/Id';
export default class CreateAccountandAttachFile extends LightningElement {
    recordId;
    name;
    type;
    userId=uId;
    fileData;
    get acceptedFormats() {
        console.log(this.userId);
        return ['.pdf', '.png','.jpg','.jpeg','.xlsx', '.xls', '.csv', '.png', '.doc', '.docx','.mp3'];
    }
    handlechange(event){
        console.log(event.target.value);
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                //'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file);

        const toast= new ShowToastEvent({
            title:`${file.name} Uploaded Successfully`,
            variant:'Success'
        })
        this.dispatchEvent(toast);
    }
    handleCreate(event){
        event.preventDefault();
    this.name= (this.template.querySelector(".c1").value);
    this.type= (this.template.querySelector(".c2").value);
    console.log(this.name+this.type);
    const{base64,filename}=this.fileData;
        create({name2:this.name,type2:this.type,base64:base64,filename:filename}).then(result =>{
            this.recordId=result;
            console.log('res'+result);
            console.log(this.recordId);
        })
        .catch(error =>{
            this.error=error;
        });

    }
    handleUploadFinished(event){
        
        //const v=JSON.stringify(event.detail.files);
        console.log(event.detail.files);
        //console.log(v[0]);
        //console.log('document'+v[0].document);
        console.log('success');
    }

}