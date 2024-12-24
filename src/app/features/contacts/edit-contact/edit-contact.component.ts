import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { HttpResponseMessage } from '../Models/HttpResponseMessage';
import { addressValidator, alphabeticValidator, emailValidator, postalCodeValidator } from '../Validators/validator';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['../add-contact/add-contact.component.css']
})
export class EditContactComponent implements OnInit{
  contactForm!: FormGroup;
  formReady: boolean = false; 
  contactId : number = 0;
  countrycode: any;
  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];
  constructor(private fb: FormBuilder,private route :ActivatedRoute,private contactService : ContactService,private router : Router)
  {

  }
  ngOnInit(): void {
    this.fetchCountries();
   this.route.params.subscribe(
    {
      next : (params)=>
      {
       this.contactId = +params['id'];
      }
    }
   );
   this.contactService.getContactById(this.contactId).subscribe(
    {
      next : (response)=>
      {
        console.log(response);
        this.contactForm = this.fb.group({
          firstName: [response.firstName, [Validators.required, Validators.minLength(2),alphabeticValidator()]],
          lastName: [response.lastName, [Validators.required,alphabeticValidator()]],
          email: [response.email, [Validators.required,emailValidator()]],
          phoneNumber: [response.phoneNumber, [Validators.required,Validators.pattern('^[0-9]{10,15}$')]],
          address: [response.address, [Validators.required,addressValidator(),Validators.maxLength(40)]],
          city: [response.city, [Validators.required]],
          state: [response.state, [Validators.required]],
          country: [response.country, [Validators.required]],
          postalCode: [response.postalCode, [Validators.required,,postalCodeValidator()]]
        });
        this.formReady = true;
        this.states = State.getStatesOfCountry(response.country);
        this.cities = City.getCitiesOfState(response.country,response.state);
      },
      error : (error)=>
      {
        var errorObj = error.error;
        console.log(errorObj.reasonPhrase);
        alert(errorObj.reasonPhrase);
      }
    }
   );
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
    this.contactForm?.get('state')?.reset();
    this.contactForm?.get('city')?.reset();
  }

  // Fetch cities based on selected state
  fetchCities(event: any) {
    const stateCode = event.target.value; // Get the selected state code
    if (stateCode) {
      this.cities = City.getCitiesOfState(this.countrycode,stateCode);
      this.contactForm?.get('city')?.reset();
    }
  }

    // Submit form
    onSubmit() {
      if (this.contactForm?.valid) {
        this.contactService.editContact(this.contactId,this.contactForm.value).subscribe(
          {
            next : (response : HttpResponseMessage)=>
            {
              alert(response.reasonPhrase);
              this.router.navigateByUrl('/home');
            },
            error : (error) =>
            {
              var errorObj = error;
              alert(errorObj.reasonPhrase);
              console.log(error);
            }
          }
        );
      } else {
        console.log('Form Invalid');
      }
    }


}
