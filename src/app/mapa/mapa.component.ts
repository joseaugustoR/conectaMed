import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['../../../node_modules/leaflet/dist/leaflet.css','./mapa.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapaComponent implements OnInit, AfterViewInit {
  private map: L.Map;

  private locations = [
    { lat: -22.88080965358846, lng: -43.462748271164365, title: 'Hospital Bangu' },
    { lat: -22.909722466569836, lng: -43.54879070334486, title: 'Hospital Campo Grande' },
    { lat: -22.923932397741172, lng: -43.678939003344446, title: 'Hospital Santa Cruz' }
  ];


  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([-22.909722466569836, -43.54879070334486], 10);
    this.initMap()
  
    this.map.whenReady(() => {
      setTimeout(() => this.map.invalidateSize(), 0); 
    });
  }
  

  private initMap() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    this.locations.forEach(location => {
      L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(location.title); 
    });
  }
}
