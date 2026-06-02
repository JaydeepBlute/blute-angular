import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';

  contactInfo = [
    {
      icon: 'location',
      title: 'Our Office',
      lines: [
        'BNN Mansion, #413/25, 3rd Floor,',
        '80 ft Road, 43rd Cross Rd, 8th Block,',
        'Jayanagar, Bengaluru, Karnataka 560070',
      ],
    },
    {
      icon: 'phone',
      title: 'Phone',
      lines: ['+91 73494 07373', '+91 72042 66167', '+91 99002 69617'],
    },
    {
      icon: 'email',
      title: 'Email',
      lines: ['info@blute.co.in'],
    },
  ];

  socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/blute-technologies', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/blutetech', icon: 'twitter' },
    { name: 'GitHub', url: 'https://github.com/blutetechnologies', icon: 'github' },
    { name: 'Instagram', url: 'https://instagram.com/blutetechnologies', icon: 'instagram' },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) return;

    // TODO: Replace with actual API call
    console.log('Form submitted:', this.contactForm.value);
    this.successMessage = 'Thank you! We will get back to you shortly.';
    this.contactForm.reset();
    this.submitted = false;
  }
}
