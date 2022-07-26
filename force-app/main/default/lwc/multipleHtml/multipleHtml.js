import { LightningElement} from 'lwc';
import multipleHtml from './multipleHtml.html';
import multipleHtml2 from './multipleHtml2.html';
export default class MultipleHtml extends LightningElement {
     bool=true;
    render(){
        this.bool?multipleHtml:multipleHtml2
    }
    toogle(){
        this.bool=!this.bool;
    }
}