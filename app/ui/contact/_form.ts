import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ContactService } from '../../services/services.contact';
import { Contact } from '../../models/contact-model';

@Component({
  selector: 'contact-form',
      templateUrl: 'app/ui/contact/_form.htm',
    providers: [ContactService]
})
export class ContactForm {
  @Input() model:Contact;
  @Input() errors:any;    
  @Input() message:String;    
  
  @Output() onSaved = new EventEmitter<Contact>();
  doSave(){
      this.onSaved.emit(this.model);
  }
}
