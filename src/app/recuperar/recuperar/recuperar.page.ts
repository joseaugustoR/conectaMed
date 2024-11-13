import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  email:any
  constructor(private authService:AuthService,private toastController: ToastController,private router: Router) { }

  ngOnInit() {
  }

  reset(){
    this.authService.resetPassword(this.email).then( () =>{      
      console.log('Enviado'); 
      this.presentToast()
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'O link para recuperar a senha foi enviado para seu E-mail',
      duration: 2000, 
      position: 'bottom' 
    });
  
    toast.present();
    toast.onDidDismiss().then(()=>{
      this.router.navigate(['/login']);
    })
  }
}
