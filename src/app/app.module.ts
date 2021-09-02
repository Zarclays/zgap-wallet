import {
  AirGapAngularCoreModule,
  AirGapTranslateLoader,
  APP_CONFIG,
  APP_INFO_PLUGIN,
  APP_PLUGIN,
  ClipboardService,
  CLIPBOARD_PLUGIN,
  DeeplinkService,
  PermissionsService,
  PERMISSIONS_PLUGIN,
  QrScannerService,
  SerializerService,
  SPLASH_SCREEN_PLUGIN,
  STATUS_BAR_PLUGIN
} from '@zarclays/zgap-angular-core'
import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'
import { Plugins } from '@capacitor/core'
import { Diagnostic } from '@ionic-native/diagnostic/ngx'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { ChartsModule } from 'ng2-charts'
import { MomentModule } from 'ngx-moment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import * as fromRoot from './app.reducers'
import { BROWSER_PLUGIN, PUSH_NOTIFICATIONS_PLUGIN, SAPLING_PLUGIN, SHARE_PLUGIN } from './capacitor-plugins/injection-tokens'
import { ComponentsModule } from './components/components.module'
import { appConfig } from './config/app-config'
import { BeaconRequestPageModule } from './pages/beacon-request/beacon-request.module'
import { BeaconRequestPage } from './pages/beacon-request/beacon-request.page'
import { ExchangeSelectPageModule } from './pages/exchange-select/exchange-select.module'
import { ExchangeSelectPage } from './pages/exchange-select/exchange-select.page'
import { IntroductionPushPage } from './pages/introduction-push/introduction-push'
import { IntroductionPushPageModule } from './pages/introduction-push/introduction-push.module'
import { ProtocolSelectPage } from './pages/protocol-select/protocol-select'
import { ProtocolSelectPageModule } from './pages/protocol-select/protocol-select.module'
import { PipesModule } from './pipes/pipes.module'
import { ShortenStringPipe } from './pipes/shorten-string/shorten-string.pipe'
import { AccountProvider } from './services/account/account.provider'
import { DrawChartService } from './services/draw-chart/draw-chart.service'
import { ExchangeProvider } from './services/exchange/exchange'
import { ExtensionsService } from './services/extensions/extensions.service'
import { ProtocolGuard } from './services/guard/protocol.guard'
import { ServiceKeyGuard } from './services/guard/serviceKey.guard'
import { TransactionHashGuard } from './services/guard/transactionHash.guard'
import { IACService } from './services/iac/iac.service'
import { LedgerService } from './services/ledger/ledger-service'
import { MarketDataService } from './services/market-data/market-data.service'
import { OperationsProvider } from './services/operations/operations'
import { PushBackendProvider } from './services/push-backend/push-backend'
import { PushProvider } from './services/push/push'
import { CoinlibService } from './services/coinlib/coinlib.service'
import { WalletStorageService } from './services/storage/storage'

export function createTranslateLoader(http: HttpClient): AirGapTranslateLoader {
  return new AirGapTranslateLoader(http, { prefix: './assets/i18n/', suffix: '.json' })
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ProtocolSelectPage, IntroductionPushPage, BeaconRequestPage, ExchangeSelectPage],
  exports: [],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AirGapAngularCoreModule,
    StoreModule.forRoot(fromRoot.reducers, {
      metaReducers: fromRoot.metaReducers,
      /* temporary fix for `ERROR TypeError: Cannot freeze array buffer views with elements` */
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot(),
    ZXingScannerModule,
    MomentModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__airgap_storage',
      driverOrder: ['sqlite', 'localstorage']
    }),
    PipesModule,
    ComponentsModule,
    ProtocolSelectPageModule,
    BeaconRequestPageModule,
    ExchangeSelectPageModule,
    IntroductionPushPageModule
  ],
  providers: [
    { provide: APP_PLUGIN, useValue: Plugins.App },
    { provide: APP_INFO_PLUGIN, useValue: Plugins.AppInfo },
    { provide: BROWSER_PLUGIN, useValue: Plugins.Browser },
    { provide: CLIPBOARD_PLUGIN, useValue: Plugins.Clipboard },
    { provide: PERMISSIONS_PLUGIN, useValue: Plugins.Permissions },
    { provide: PUSH_NOTIFICATIONS_PLUGIN, useValue: Plugins.PushNotifications },
    { provide: SAPLING_PLUGIN, useValue: Plugins.SaplingNative },
    { provide: SHARE_PLUGIN, useValue: Plugins.Share },
    { provide: SPLASH_SCREEN_PLUGIN, useValue: Plugins.SplashScreen },
    { provide: STATUS_BAR_PLUGIN, useValue: Plugins.StatusBar },
    { provide: APP_CONFIG, useValue: appConfig },
    DecimalPipe,
    ShortenStringPipe,
    MarketDataService,
    DrawChartService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QrScannerService,
    Diagnostic,
    AccountProvider,
    WalletStorageService,
    IACService,
    ClipboardService,
    PermissionsService,
    DeeplinkService,
    OperationsProvider,
    ExtensionsService,
    ExchangeProvider,
    CoinlibService,
    PushProvider,
    PushBackendProvider,
    SerializerService,
    LedgerService,
    ProtocolGuard,
    ServiceKeyGuard,
    TransactionHashGuard,
    PercentPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
