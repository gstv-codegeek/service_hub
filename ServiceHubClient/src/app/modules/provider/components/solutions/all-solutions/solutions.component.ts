import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProviderService} from '../../../services/provider.service';
import {MatButton} from '@angular/material/button';
import {StorageService} from '../../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-solutions',
  imports: [
    NgForOf,
    NzSpinComponent,
    NzTableComponent,
    MatButton
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {
  isSpinning: boolean = false;
  services: any = [];
  categories: any = [];
  categoryMap = new Map<number, string>();
  createCategoryMap() {
    this.categories.forEach((category: any) => {
      this.categoryMap.set(category.id, category.categoryName);
    })
  }

  constructor(private providerService: ProviderService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getMyServices();
    this.getAllCategories();
  }

  getAllCategories() {
    this.providerService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.createCategoryMap();
        console.log("All Categories: ", res);
      },
      error: (err) => {
        this.message.error("Something went wrong");
      }
    })
  }

  getMyServices() {
    this.isSpinning = true
    this.providerService.getMyServices(StorageService.getUserId()).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.services = res;
        console.log("My Services: ", res);
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    })
  }
}
