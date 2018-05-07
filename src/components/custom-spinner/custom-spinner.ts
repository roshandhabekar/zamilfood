import { Component } from '@angular/core';

/**
 * Generated class for the CustomSpinnerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'spinner',
  templateUrl: 'custom-spinner.html'
})
export class CustomSpinnerComponent {

  text: string;

  constructor() {

    this.text = 'Hello World';
  }

}
