import { Specs } from './../shared/specs';
import { DataService } from './../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  cart : Specs[] = [];

  @ViewChild('fform') feedbackFormDirective

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
  };


  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Phone number is required.',
      'pattern':       'Phone number must contain only numbers.',
      'minlength': 'Phone number must have 10 digits',
      'maxlength': 'Phone number must have 10 digits'
    }
  };

  constructor(private fb: FormBuilder, private dataService : DataService) {
    this.createForm();
  }

  submit = false;
  total_price = 0;

  
  ngOnInit() {
    this.dataService.share.subscribe((x) =>
     {
       this.cart = x; 
       for(let i of x){
         this.total_price += i.price;
       }
      });
  }
  
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern, Validators.minLength(10), Validators.maxLength(10)] ],
      agree: false,
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
    
  }

  onSubmit(){ 
    this.feedback = this.feedbackForm.value;
  
    
    this.dataService.getCart([]);
    this.submit = true;
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      agree: false,
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] +  '  ';
            }
          }
        }
      }
    }
  }


}
