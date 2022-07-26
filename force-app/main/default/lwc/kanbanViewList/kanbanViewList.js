import { LightningElement,api } from 'lwc';

export default class KanbanViewList extends LightningElement {
    @api records;
    @api stage;
    connectedCallback(){
        //console.log('list pickvalues'+JSON.stringify(this.records))
        console.log('list'+JSON.stringify(this.records))
        //console.log(typeof(this.records))
        console.log(this.stage+'list');
    }
    handledrag(event){
        let evt=new CustomEvent('itemdrag2',{detail:event.detail})
        console.log('list Component'+event.detail);
        this.dispatchEvent(evt);
    }
    handleitemDrop(evt){
        let event=new CustomEvent('itemdrop',{detail:this.stage})
        console.log('list Stage'+this.stage);
        this.dispatchEvent(event);
    }
    handleDragOver(event){
        event.preventDefault();
    }

}