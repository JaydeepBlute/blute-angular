import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Client {
  name: string;
  image: string;
  industry: string;
  industryColor: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  activeIndustry = 'All';

  stats = [
    { value: '23+', label: 'Happy Clients' },
    { value: '8+', label: 'Industries' },
    { value: '50+', label: 'Projects Done' },
    { value: '8+', label: 'Years of Trust' },
  ];

  clients: Client[] = [
    {
      name: 'Agile Network',
      image: 'assets/images/clients/agile.jpeg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Aikya',
      image: 'assets/images/clients/aikya.jpeg',
      industry: 'Others',
      industryColor: 'bg-gray-100 text-gray-700',
    },
    {
      name: 'Alkimi',
      image: 'assets/images/clients/alkimi.jpeg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Amazing Care',
      image: 'assets/images/clients/AmazingCare.jpg',
      industry: 'Healthcare',
      industryColor: 'bg-red-100 text-red-700',
    },
    {
      name: 'Arion',
      image: 'assets/images/clients/arion.jpeg',
      industry: 'Manufacturing',
      industryColor: 'bg-orange-100 text-orange-700',
    },
    {
      name: 'Conlis Global',
      image: 'assets/images/clients/conlis.jpeg',
      industry: 'Finance',
      industryColor: 'bg-green-100 text-green-700',
    },
    {
      name: 'Evoscience',
      image: 'assets/images/clients/evoscience.jpg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'First Earth',
      image: 'assets/images/clients/firstearth.webp',
      industry: 'Energy',
      industryColor: 'bg-teal-100 text-teal-700',
    },
    {
      name: 'Gravity India Technologies',
      image: 'assets/images/clients/gravity-india-technologies.png',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'HeyLearno',
      image: 'assets/images/clients/heylearno.png',
      industry: 'Education',
      industryColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      name: 'Infosys',
      image: 'assets/images/clients/infosys.jpg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'ITC Infotech',
      image: 'assets/images/clients/ITC-Infotech.webp',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Medverve',
      image: 'assets/images/clients/medverve.jpeg',
      industry: 'Healthcare',
      industryColor: 'bg-red-100 text-red-700',
    },
    {
      name: 'Mitsubishi',
      image: 'assets/images/clients/Mitsubishi.png',
      industry: 'Manufacturing',
      industryColor: 'bg-orange-100 text-orange-700',
    },
    {
      name: 'Nivetti',
      image: 'assets/images/clients/nivetti.jpeg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Novem Solutions',
      image: 'assets/images/clients/novem.jpg',
      industry: 'Others',
      industryColor: 'bg-gray-100 text-gray-700',
    },
    {
      name: 'Percept',
      image: 'assets/images/clients/percept.png',
      industry: 'Retail',
      industryColor: 'bg-yellow-100 text-yellow-700',
    },
    {
      name: 'Power Synergy',
      image: 'assets/images/clients/powersynergy.png',
      industry: 'Energy',
      industryColor: 'bg-teal-100 text-teal-700',
    },
    {
      name: 'Simplex',
      image: 'assets/images/clients/simplex.jpeg',
      industry: 'Finance',
      industryColor: 'bg-green-100 text-green-700',
    },
    {
      name: 'SKBL',
      image: 'assets/images/clients/skbl.jpeg',
      industry: 'Finance',
      industryColor: 'bg-green-100 text-green-700',
    },
    {
      name: 'Transorion',
      image: 'assets/images/clients/tansorian.png',
      industry: 'Manufacturing',
      industryColor: 'bg-orange-100 text-orange-700',
    },
    {
      name: 'Ullas',
      image: 'assets/images/clients/ullas.png',
      industry: 'Others',
      industryColor: 'bg-gray-100 text-gray-700',
    },
    {
      name: 'Xuberant',
      image: 'assets/images/clients/XUBERANT.jpg',
      industry: 'Technology',
      industryColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Zeiss',
      image: 'assets/images/clients/Zeiss.png',
      industry: 'Manufacturing',
      industryColor: 'bg-orange-100 text-orange-700',
    },
  ];

  get filteredClients(): Client[] {
    if (this.activeIndustry === 'All') return this.clients;
    return this.clients.filter((c) => c.industry === this.activeIndustry);
  }
}
