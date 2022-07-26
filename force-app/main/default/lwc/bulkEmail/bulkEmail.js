import { LightningElement,wire } from 'lwc';
import getlistviews from'@salesforce/apex/MassMailer.getlistviews';
import allObjects from '@Salesforce/apex/MassMailer.allObjects';
import makeCallout from '@Salesforce/apex/calloutClass.makeCallout';

export default class MassMailer extends LightningElement {
    @wire(allObjects)allObject;
    @wire(makeCallout,{listName:'$listViewName', objName:'$objectName'})calloutRecord;
    @wire(getlistviews,{obj:'$objectName'}) results;
    objectName;
    listViewName;
    renderListView=false;
    stage;
    storeId=[];
    idToSend=[];
    cols=[
      {label:'Id', fieldName:'Id'},
      {label:'Name', fieldName:'Name'},
      {label:'Email',fieldName:'Email'}
    ];
   steps=[
     {label:'Select Object',value:'Select Object'},
     {label:'Select List View',value:'Select List View'},
     {label:'Select Records',value:'Select Records'},
     {label:'Add Attachments',value:'Add Attachments'},
    ];
   handleObjectChange(event){
      this.stage=this.steps[1].value;
      this.objectName=event.target.value;
      this.renderListView=true;
      console.log(this.objectName);
    }
    handleListViewChange(event){
      this.stage=this.steps[2].value;
      this.listViewName=event.target.value;
      console.log(this.listViewName);
    }
    handleRecordSelect(event){
        this.stage=this.steps[3].value;
        console.log('Hii');
        //console.log(this.template.querySelector('lightning-datatable').getSelectedRows());
        this.storeId=this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log(this.storeId[0]);
        for(let i=0;i<this.storeId.length;i++){
            this.idToSend.push(this.storeId[i].Id);
        }
        console.log(this.idToSend);
    }
}