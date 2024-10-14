import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [DeviceMotion, Flashlight, Vibration]
})
export class HomePageModule {}
