import { LightningElement } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class BarcodeScanner extends LightningElement {
    ScannedCode;
    connectedCallback(){
        this.myScanner=getBarcodeScanner();
    }
    handleClick(){
        console.log('scanning the Barcode');
        if(this.myScanner.isAvailable()){
            console.log('Available');
            const scanningOptions = {
                barcodeTypes: [this.myScanner.barcodeTypes.QR, 
                                this.myScanner.barcodeTypes.UPC_E,
                                this.myScanner.barcodeTypes.EAN_13,
                                this.myScanner.barcodeTypes.CODE_39 ],
                instructionText: 'Scan a QR , UPC , EAN 13, Code 39',
                successText: 'Scanning complete.'
            }; 
            this.myScanner.beginCapture(scanningOptions)
            .then((result)=>{
                this.ScannedCode=result;
                console.log('Code Details');
                console.log(this.ScannedCode);
            })
            .catch((error)=>{
                this.showError('error',error);
            })
            .finally(()=>{
                this.myScanner.endCapture();
            })
        }
        else{
            this.showError('Error','Barcode not captured successfully')
        }

        showError(title,mssg)
        {
            const toast = new ShowToastEvent({
                title:title,
                message:mssg,
                error:'error'
            });
            
            this.dispatchEvent(toast);
        }
    }
}