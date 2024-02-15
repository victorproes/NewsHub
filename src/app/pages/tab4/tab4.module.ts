import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExampleComponent } from 'src/app/modal/example.component';
import { ModalExampleComponent } from 'src/app/modal/modal-example.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab4PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab4Page,ExampleComponent,ModalExampleComponent]
})
export class Tab4PageModule {}
