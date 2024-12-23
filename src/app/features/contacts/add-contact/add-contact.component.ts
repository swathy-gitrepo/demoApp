import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { addressValidator, alphabeticValidator, emailValidator, postalCodeValidator } from '../Validators/validator';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];
countrycode : string = '';
  constructor(private fb: FormBuilder,private contactService : ContactService,private router : Router) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2),alphabeticValidator()]],
      lastName: ['', [Validators.required, alphabeticValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', [Validators.required,addressValidator(),Validators.maxLength(100)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required,postalCodeValidator()]]
    });
  }

  ngOnInit(): void {
    this.fetchCountries();
  }

  getControl(controlName: string): FormControl {
    return this.contactForm?.get(controlName) as FormControl;
  }

  // Fetch countries from the country-state-city library
  fetchCountries() {
    this.countries = Country.getAllCountries();
  }

  // Fetch states based on selected country
  fetchStates(event: any) {
     this.countrycode = event.target.value; // Get the selected country code
    this.states = State.getStatesOfCountry(this.countrycode);
    this.cities = []; // Clear cities when country is changed
    this.contactForm.get('state')?.reset();
    this.contactForm.get('city')?.reset();
  }

  // Fetch cities based on selected state
  fetchCities(event: any) {
    const stateCode = event.target.value; // Get the selected state code
    if (stateCode) {
      this.cities = City.getCitiesOfState(this.countrycode,stateCode);
      this.contactForm.get('city')?.reset();
    }
  }

  // Submit form
  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(
        {
          next : (response)=>
          {
            alert("Contact Added Successfully");
            this.router.navigateByUrl('/home');
          },
          error : (error) =>
          {
            console.log(error);
            alert("Failed to add contact. Please try again.");
          }
        }
      );
    } else {
      console.log('Form Invalid');
    }
  }
}
