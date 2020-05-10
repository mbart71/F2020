import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { angularLogo, firebaseLogo, firestoreLogo, functionsLogo } from './assets';

@Component({
  selector: 'info-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

  angular = this.sanitizer.bypassSecurityTrustResourceUrl(angularLogo);
  firebase = this.sanitizer.bypassSecurityTrustResourceUrl(firebaseLogo);
  firestore = this.sanitizer.bypassSecurityTrustResourceUrl(firestoreLogo);
  functions = this.sanitizer.bypassSecurityTrustResourceUrl(functionsLogo);

  constructor(private sanitizer: DomSanitizer) { }
}
