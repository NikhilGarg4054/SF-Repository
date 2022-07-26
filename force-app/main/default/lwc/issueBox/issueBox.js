import { LightningElement,wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import createIssue from '@salesforce/apex/Issues.createIssue';
export default class IssueBox extends LightningElement {
name;
priority;
status;
description;
ReproStep;
Expected;
Actual;
files=[];
type;
result;

    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg','.xlsx', '.xls', '.csv', '.png', '.doc', '.docx','.mp3'];
        }
    handleclick(event){
        
        this.name=(this.template.querySelector(".inp").value);
       
        this.priority=(this.template.querySelector(".inp2").value);
       
       this.status=(this.template.querySelector(".inp3").value);
        
       this.ReproStep=(this.template.querySelector(".inp4").value);
       
        this.Expected=(this.template.querySelector(".inp5").value);
        
        this.Actual=(this.template.querySelector(".inp6").value);
       
        this.description=(this.template.querySelector(".inp7").value);
        
        this.type=(this.template.querySelector(".inp8").value);
        console.log('type'+this.type);
        
        console.log(this.name+this.priority+this.status+this.description+this.ReproStep+this.Actual+this.Expected+this.type);

        createIssue({Name:this.name,types:this.type,priority:this.priority,status:this.status,step:this.ReproStep,expectedResult:this.Expected,actualResult:this.Actual,description:this.description,files:this.files})
        .then((result)=>{
            this.result=result;
        })
        .catch((error)=>{
            this.result=error;
        });
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Success',
                message: 'Issue has been Raised Successfully ',
                variant:'Success'
            })
        );
        const f=this.template.querySelectorAll('lightning-input-field');
                if(f){
                    f.forEach(field=>{
                        field.reset();
                    });
                }
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
}