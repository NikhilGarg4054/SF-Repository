import { LightningElement,wire,api } from 'lwc';
import getTemplate from '@salesforce/apex/ExistingTemplates.getTemplate';
import setTemplate from '@salesforce/apex/ExistingTemplates.setTemplate';
import uploadFile from '@salesforce/apex/ExistingTemplates.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import MailToSend from '@salesforce/apex/MailClass.MailToSend';
import MailToSend2 from '@salesforce/apex/MailClass.MailToSend2';
import getFiles from '@salesforce/apex/MailClass.getFiles';
export default class EmailTemplates extends LightningElement {
    @wire(getTemplate)results;
    Templates;
    body;
    subject;
    defaults='nik';
    bool;
    result;
    files=[];
 //@wire(getFiles) SFfiles;
 //options=[];

 /*for(string s:this.SFfiles){
    // this.options.push({value:'s',label:'s'});
    console.log(s);
 }*/
    get acceptedFormats() {
        
        return ['.pdf', '.png','.jpg','.jpeg','.xlsx', '.xls', '.csv', '.png', '.doc', '.docx','.mp3'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
            console.log(uploadedFiles[i].name);
            this.files.push(uploadedFiles[i].name);
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }

// calling apex method for setting templates selected by user
    

    handlechange(event){
        this.Templates=event.target.value;
        console.log(this.Templates);
    }
    @wire(setTemplate,{n:'$Templates'}) res;

    // Preview Button for templates subject and body 

    handlePreview(event){
        
        this.body=this.res.data.Body;
        this.subject=this.res.data.Subject;
        this.bool='true';
        console.log(this.res.data.Name);
        console.log(this.res.data.Subject);
        console.log(this.res.data.Body);
        console.log('credex');
    }
    /// send Button

    onclick(event){
      
    
    /*for(var i=0;i<this.SFfiles.length;i++){
        this.options.push({value:this.SFfiles.title, label:this.SFfiles.title});
    }
    console.log('this.options :'+this.options);*/
// fetching data using class
    var input=this.template.querySelector(".inp");
    console.log(input.value+'nik');
    var input2=this.template.querySelector(".inp2");
    console.log(input2.value);
    console.log('nik');
    console.log('files'+this.files[0]+' '+this.files[1]+' '+this.files[2]+' ');

    // checking files to send.
    
    if(this.files.length==0){
        MailToSend2({subject:input.value,body:input2.value,template:this.Templates}) // if attachments not selected by user
    .then((result)=>{
       this.result=result})
    .catch((error)=>{
        this.result=error;
    });

    const evt=new ShowToastEvent({
        title:'Emails Have been sent Successfully without any Attachment',
        message:'',
        variant:'success'
    });
    this.dispatchEvent(evt);

    }
// if attachments selected by user
    else{
    MailToSend({subject:input.value,body:input2.value,template:this.Templates,file:this.files})
    .then((result)=>{
       this.result=result})
    .catch((error)=>{
        this.result=error;
    });

    const evt=new ShowToastEvent({
        title:'Emails Have been sent Successfully',
        message:'',
        variant:'success'
    });
    this.dispatchEvent(evt);
    }
}
/*handlefiles(event){
    console.log(event.detail.value);
}*/

 //    Upload Files to Email

    @api recordId;
    
   /* openfileUpload(event) {
        const file = event.target.files[0];
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData);
            console.log(this.recordId);
        }
        reader.readAsDataURL(file)
    }
    handleClick(){
        const {base64, filename,recordId} = this.fileData
        uploadFile({ base64, filename,recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
        console.log(this.fileData);
        console.log(this.fileData.filename);
this.document=this.fileData.filename;
    }
    toast(title){
        const toastEvent = new ShowToastEvent({
            title,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }*/
}

   
