import { LightningElement,wire } from 'lwc';
import getlistviews from'@salesforce/apex/MassMailer.getlistviews';
import allObjects from '@salesforce/apex/MassMailer.allObjects';
import getListviewFilters from '@salesforce/apex/calloutClass.getListviewFilters';
export default class MassMailer extends LightningElement {
    @wire(allObjects)allObject;
    object;
    results;
    ListView;
    render=false;
    stage;
    @wire(getListviewFilters,{ListName:'$ListView', objectName:'$object'}) record;
   @wire(getlistviews,{obj:'$object'}) results;
   //columns=[{label:'Name',fieldName:'Name'}];
   steps=[{label:'Select Object',value:'Select Object'},{label:'Select List View',value:'Select List View'},{label:'Select Records',value:'Select Records'},{label:'Add Attachments',value:'Add Attachments'}]
    handleObject(event){
        this.object=event.target.value;
        console.log(this.object);
        console.log(this.record.data);
    }
    handleclickObject(event){
      /*getlistviews({obj:this.val})
      .then(result=>{
        this.results=result;
      })
      .catch(error=>{
        this.results=error;
      });*/
      this.stage=this.steps[1].value;
      this.render=true;
      console.log(this.results.data);
      console.log('nik');
      console.log(JSON.stringify(this.results.data));
      console.log(JSON.stringify(this.results));
    }
    handleListView(event){
      this.ListView=event.target.value;
      console.log(this.ListView);
      console.log(this.record.data);
      console.log(JSON.stringify(this.record.data));
    }
}