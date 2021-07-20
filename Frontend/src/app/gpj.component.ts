import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../assets/constants';

@Component({
  selector: 'gpj-root',
  templateUrl: './gpj.component.html',
  styleUrls: ['./gpj.component.sass']
})
export class AppComponent implements OnInit {
  title = 'print-jobs-app';
  translateToLanguage: string = LANGUAGES[0];

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const getLanguageFromLocalStorage = localStorage.getItem('language');
    if (getLanguageFromLocalStorage) {
      this.translateToLanguage = getLanguageFromLocalStorage;
    }
    this.translateService.use(this.translateToLanguage);
  }
}
