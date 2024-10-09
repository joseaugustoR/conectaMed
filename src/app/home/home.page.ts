import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController
  ) {

    

     /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
  }

  goContatos() {
    this.navCtrl.navigateRoot('contatos')
  }

}
