import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.scss']
})
export class NewTermComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'definition': [
    { type: 'required', message: 'Definition is required.' },
  ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      acronymMeaning: [''],
      definition: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      acronymMeaning: new FormControl(''),
      definition: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    this.firebaseService.createTerm(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
