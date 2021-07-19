import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/assets/constants';

@Component({
  selector: 'gpj-switch-languages',
  templateUrl: './switch-languages.component.html',
  styleUrls: ['./switch-languages.component.sass']
})
export class SwitchLanguagesComponent implements OnInit {
  languageToUse: string = '';
  availableLanguages = LANGUAGES;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.languageToUse = this.translateService.currentLang;
    if (!localStorage.getItem('lagguage')) {
      localStorage.setItem('language', this.languageToUse);
    }
  }

  changeLanguage(event: any): void {
    this.languageToUse = event.target.closest('button').id;
    this.translateService.use(this.languageToUse);
    localStorage.setItem('language', this.languageToUse);
  }

}
