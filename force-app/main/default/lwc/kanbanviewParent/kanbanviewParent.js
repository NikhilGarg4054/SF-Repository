import { LightningElement,wire } from "lwc";
import { getListUi } from "lightning/uiListApi";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
//import OPPORTUNITY_OBJECT from  '@salesforce/schema/Opportunity';
import Task__c_OBJECT from  '@salesforce/schema/Task__c';
//import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import Status__c_FIELD from '@salesforce/schema/Task__c.Status__c';
//import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import ID_FIELD from '@salesforce/schema/Task__c.Id';
import { updateRecord } from "lightning/uiRecordApi";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import {refreshApex} from '@salesforce/apex';
export default class kanbanviewParent extends LightningElement{
    recordData;
    pickvals;
    recordId;
    @wire(getListUi,{
        objectApiName:/*OPPORTUNITY_OBJECT*/Task__c_OBJECT,
        listViewApiName:/*'AllOpportunities'*/'All'
    }) wiredRecords({data,error}){
        if(data){
            console.log(data);
            console.log('nik');
           this.recordData=data.records.records.map(item =>{
                return{'Id':item.fields.Id.value,'Name':item.fields.Name.value,/*'AccountIdValue':item.fields.Account.value.fields.Id.value,'AccountNameValue':item.fields.Account.value.fields.Name.value,*//*'CloseDate':item.fields.CloseDate.value,'Amount':item.fields.Amount.value,'StageName':item.fields.StageName.value*/'Status__c':item.fields.Status__c.value,'Hours':item.fields.Estimated_Hours__c.value,'ProjectId':item.fields.Project__r.value.fields.Id.value,'ProjectName':item.fields.Project__r.value.fields.Name.value}
            })
            console.log(this.recordData);
        }
        else{
            console.log(error);
        }
    }
    /* fetching RecordTypeID AND Metadata of specific object*/
@wire(getObjectInfo,
    {objectApiName:/*OPPORTUNITY_OBJECT*/Task__c_OBJECT}) objectinfo;

    /* fetching list of picklist values of Field Stage*/
@wire(getPicklistValues,{
    recordTypeId:'$objectinfo.data.defaultRecordTypeId',
    fieldApiName:/*STAGE_FIELD*/Status__c_FIELD
}) picklistData({data,error}){
    if(data){
        //console.log(data);
        this.pickvals=data.values.map(item=>item.value);
        console.log(this.pickvals);
    }
    if(error){
        console.error(error);
    }
}
/**getter to calculate the width dynamically */
get widthcal(){
    let len=this.pickvals.length+1
    return `width: calc(100vw/ ${len})`
}

handleListItemDrag(event){
this.recordId=event.detail;
console.log('Parent RecordId'+this.recordId);
}
handleItemDrop(event){
    let stage=event.detail;
    console.log(stage);
    console.log(this.recordId);
    /*this.recordData=this.recordData.map(item =>{
        return item.Id === this.recordId?{...item,StageName:stage}:{...item}
    })*/
    this.updateHandler(stage);
}
updateHandler(stage){
    console.log('update Handler'+stage);
    console.log(this.recordId);
    const fields={};
    fields[ID_FIELD.fieldApiName]=this.recordId;
    //fields[STAGE_FIELD.fieldApiName]=stage;
    fields[Status__c_FIELD.fieldApiName]=stage
    
    const recordInput={fields}
    console.log('recordInput  '+JSON.stringify(recordInput))
    updateRecord(recordInput)
    .then(()=>{
        console.log('updated')
        this.showToast()
        return refreshApex(this.wiredRecords)
    }).catch(error=>{
        console.error(error)
    })
    
}
showToast(){
    this.dispatchEvent(new ShowToastEvent({
        title:'Success',
        variant:'success',
        message:'Your Task is Successfully Saved with Change in Status'
    })
    )
}
}