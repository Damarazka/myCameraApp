import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public photo: string | null = null;

  constructor() {
    this.loadPhotoFromStorage(); // Memuat kembali foto dari penyimpanan saat halaman dimuat
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Menentukan sumber foto dari kamera
      });

      if (image && image.webPath) {
        this.photo = image.webPath;
        await this.savePhotoToStorage(image.webPath);
      } else {
        console.error('No image or webPath found in camera result:', image);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async savePhotoToStorage(photoUri: string) {
    try {
      await Storage.set({
        key: 'myPhoto',
        value: photoUri,
      });
      console.log('Photo saved to storage:', photoUri);
    } catch (error) {
      console.error('Unable to save photo to storage', error);
    }
  }

  async loadPhotoFromStorage() {
    try {
      const { value } = await Storage.get({ key: 'myPhoto' });
      if (value) {
        this.photo = value;
        console.log('Loaded photo from storage:', value);
      }
    } catch (error) {
      console.error('Unable to load photo from storage', error);
    }
  }

  async clearStorage() {
    try {
      await Storage.remove({ key: 'myPhoto' });
      this.photo = null;
      console.log('Photo removed from storage');
    } catch (error) {
      console.error('Unable to clear storage', error);
    }
  }

  ionViewWillEnter() {
    this.loadPhotoFromStorage(); // Memuat kembali foto dari penyimpanan saat halaman dimuat
  }
}
