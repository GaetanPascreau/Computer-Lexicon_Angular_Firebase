import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.scss']
})
export class TermDetailComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  // make the textarea fits the size of the definition text
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'definition': [
    { type: 'required', message: 'Definition is required.' }
  ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    this.uploadSelectedForm();
  }

  uploadSelectedForm(){
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      acronymMeaning: [this.item.acronymMeaning],
      definition: [this.item.definition, Validators.required]
    });
  }

  onSubmit(value){
    this.firebaseService.updateTerm(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/edit/'+ this.item.id]);
      }
    )
  }
  
  onBack(){
    this.router.navigate(['/home']);
  }

}