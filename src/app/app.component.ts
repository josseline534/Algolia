import { Component } from '@angular/core';
import { ImagenesServices } from './services/imagenes.service';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('F2YE0L1K11', '6c345fee5812d36380334478883ee8e4');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /* providers: [ImagenesServices], */
})
export class AppComponent {
  title = 'frontPrueba';
  searchText: string = '';
  hidden: boolean = true;
  infoImages: TResponseInfo[] = [];

  config = {
    indexName: 'demo_ecommerce',
    client,
  };

  constructor(private _imagenesServices: ImagenesServices) {}

  searchforID = async () => {
    this.infoImages = [];
    try {
      const response = await this._imagenesServices
        .getImage(parseInt(this.searchText))
        .toPromise();
      if (response.code === 200) {
        this.infoImages[0] = response.response;
        this.hidden = false;
      }
    } catch (error) {}
  };

  searchAll = async () => {
    this.infoImages = [];
    try {
      const response = await this._imagenesServices.getImageAll().toPromise();
      if (response.code === 200) {
        this.infoImages = response.response;
        this.hidden = false;
      }
    } catch (error) {}
  };

  search = async () => {
    if (this.searchText === '') this.searchAll();
    else this.searchforID();
  };

  searchAlgolia = async () => {};
}

type TResponseInfo = {
  id: number;
  archivo: string;
};
