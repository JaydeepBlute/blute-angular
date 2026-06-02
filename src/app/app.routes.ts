// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { ProductEngineeringComponent } from './product-engineering/product-engineering.component';
import { MobileAppDevelopmentComponent } from './mobile-app-development/mobile-app-development.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { BuildTeamComponent } from './build-team/build-team.component';
import { IotSolutionsComponent } from './iot-solutions/iot-solutions.component';
import { AboutComponent } from './about.component/about.component';
import { TeamComponent } from './team/team.component';
import { CareersComponent } from './careers/careers.component';
import { ClientsComponent } from './clients/clients.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ContactComponent } from './contact/contact.component';
import { RetailEcommerceComponent } from './retail-ecommerce/retail-ecommerce.component';
import { HealthcarePharmaComponent } from './healthcare-pharma/healthcare-pharma.component';
import { BfsiComponent } from './bfsi/bfsi.component';
import { GovernmentComponent } from './government/government.component';
import { ManufacturingComponent } from './manufacture/manufacture.component';
import { EducationComponent } from './education/education.component';
import { TransportationComponent } from './transportation/transportation.component';
import { TelecomComponent } from './telecom/telecom.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { DevopsComponent } from './devops/devops.component';
import { ItConsultingComponent } from './it-consulting/it-consulting.component';
import { CyberSecurityComponent } from './cyber-security/cyber-security.component';
import { NetworkingComponent } from './networking/networking.component';
import { WebApplicationComponent } from './web-application/web-application.component';
import { CloudDetailComponent } from './cloud/cloud.component';
import { CognitiveDetailComponent } from './cognitive/cognitive.component';
import { AgenticAiDetailComponent } from './agentic-ai/agentic-ai.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'mobile-app-development',
    component: MobileAppDevelopmentComponent,
  },
  {
    path: 'product-engineering',
    component: ProductEngineeringComponent,
  },
  {
    path: 'ecosystem',
    component: EcosystemComponent,
  },
  {
    path: 'build-team',
    component: BuildTeamComponent,
  },
  { path: 'iot-solutions', component: IotSolutionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'industries/government', component: GovernmentComponent },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'retail-ecommerce',
    loadComponent: () =>
      import('./retail-ecommerce/retail-ecommerce.component').then(
        (m) => m.RetailEcommerceComponent,
      ),
  },
  {
    path: 'healthcare-pharma',
    component: HealthcarePharmaComponent,
  },
  { path: 'industries/bfsi', component: BfsiComponent },
  { path: 'industries/manufacturing', component: ManufacturingComponent },
  { path: 'industries/education', component: EducationComponent },
  { path: 'industries/transportation', component: TransportationComponent },
  { path: 'industries/telecom', component: TelecomComponent },
  { path: 'enterprise', component: EnterpriseComponent },
  { path: 'devops', component: DevopsComponent },
  { path: 'it-consulting', component: ItConsultingComponent },
  { path: 'cyber-security', component: CyberSecurityComponent },
  { path: 'networking', component: NetworkingComponent },
  { path: 'devsecops', component: DevopsComponent },
  { path: 'web-application', component: WebApplicationComponent },
  { path: 'cloud', component: CloudDetailComponent },
  { path: 'cognitive', component: CognitiveDetailComponent },
  { path: 'agentic-ai', component: AgenticAiDetailComponent },
  { path: 'portfolio', component: PortfolioComponent },
];
