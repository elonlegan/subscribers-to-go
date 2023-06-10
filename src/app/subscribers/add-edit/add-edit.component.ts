import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EmailOrPhone } from '@app/helpers';
import { Country, CountryList } from '@app/models';
import { AlertService } from '@app/services';
import { CountriesService } from '@app/services/countries.service';
import { SubscribersService } from '@app/services/subscribers.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  form: UntypedFormGroup;
  loading = false;
  countries: Country[];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subscribersService: SubscribersService,
    private countriesService: CountriesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.filterCountries();

    this.form = this.formBuilder.group({
      Subscribers: this.formBuilder.array([]),
    });

    this.addSubscriber();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  subscribers(): FormArray {
    return this.form.get('Subscribers') as FormArray;
  }

  newSubscriber(): FormGroup {
    return this.formBuilder.group(
      {
        Name: ['', Validators.required],
        Email: ['', [Validators.email]],
        CountryCode: [''],
        JobTitle: [''],
        Area: [''],
        PhoneNumber: [''],
        Topics: [[]],
      },
      {
        validator: EmailOrPhone(),
      }
    );
  }

  addSubscriber() {
    this.subscribers().push(this.newSubscriber());
  }

  removeSubscriber(i: number) {
    if (this.subscribers().controls.length <= 1) {
      return;
    }
    this.subscribers().removeAt(i);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.createSubscribers();
  }

  private async createSubscribers() {
    try {
      this.subscribersService
        .create(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Subscribers created successfully');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

  filterCountries(criteria?: string) {
    this.countriesService
      .get({ count: 300, ...(criteria ? { criteria } : '') })
      .pipe(first())
      .subscribe((countryList: CountryList) => {
        this.countries = countryList.Data;
      });
  }
}
