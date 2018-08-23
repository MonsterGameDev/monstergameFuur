import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmorComponent } from './armor/armor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { ArmorListComponent } from './armor-list/armor-list.component';
import { RouterModule } from '@angular/router';
import { ArmorDetailComponent } from './armor-detail/armor-detail.component';
import { DataResolverService } from './services/data-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptorService } from './services/add-header-interceptor.service';
import { LogResponseInterceptorService } from './services/log-response-interceptor.service';
import { CacheService } from './services/cache.service';
import { CacheInterceptorService } from './services/cache-interceptor.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'armor', component: ArmorListComponent, resolve: { resolvedArmor: DataResolverService} },
      { path: 'armordetails/:id', component: ArmorDetailComponent },
      { path: 'editarmor/:id', component: ArmorComponent},
    ])
  ],
  declarations: [ArmorComponent, AdminContainerComponent, ArmorListComponent,  ArmorDetailComponent],
  exports: [ArmorComponent, AdminContainerComponent],
  providers: [
    DataResolverService,
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptorService , multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService , multi: true} // will receive the edited requestng
   ]
})

export class AdminModule { }
