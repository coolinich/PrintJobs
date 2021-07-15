import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../assets/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'print-jobs-app';
  translateToLanguage: string = LANGUAGES[0];

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const languageFromLocalStorage = localStorage.getItem('language');
    if (languageFromLocalStorage) {
      this.translateToLanguage = languageFromLocalStorage;
    }
    this.translateService.use(this.translateToLanguage);
  }
}
