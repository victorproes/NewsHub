import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from 'src/app/interfaces';
import { AppEventService } from 'src/app/services/app-event.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  favoriteArticles: Article[] = [];

  constructor(private storage: Storage, private appEventService: AppEventService) {}

  async ngOnInit() {
    console.log('Tab3Page ngOnInit called');

    await this.storage.create();
    this.appEventService.articleChanged.subscribe(() => {
      this.loadFavoriteArticles();
    });
  }

  async loadFavoriteArticles() {
    console.log('Loading favorite articles...');
    const storedFavoriteArticles = await this.storage.get('favoriteArticles');
  
    try {
      const parsedFavoriteArticles = JSON.parse(storedFavoriteArticles);
      if (Array.isArray(parsedFavoriteArticles)) {
        this.favoriteArticles = parsedFavoriteArticles;
        console.log('Favorite Articles:', this.favoriteArticles);
      } else {
        this.favoriteArticles = [];
        console.log('aqui esta entrando en el else', this.favoriteArticles);
      }
    } catch (error) {
      console.error('Error parsing stored favorite articles:', error);
      this.favoriteArticles = [];
    }
  }
}
