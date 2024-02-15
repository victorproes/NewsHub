import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  formData = {
    country: '',
    province: ''
  };
  selectedFile: File | null = null;
  photoData: string | null = null;
  submitted: boolean = false;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async takePhoto() {
    try {
      // Capturar la foto con la cámara
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      // Guardar la foto en el almacenamiento local
      if (photo && photo.base64String) {
        this.photoData = photo.base64String;
        console.log('Photo captured:', photo);
      } else {
        console.error('No se pudo obtener la foto o la cadena base64 está vacía.');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  async onSubmit() {
    // Guardar los datos localmente
    const formData = {
      country: this.formData.country,
      province: this.formData.province,
      photo: this.photoData
    };

    await this.storage.set('formData', JSON.stringify(formData));
    console.log('Form data saved locally:', formData);

    // Marcar el formulario como enviado para mostrar los datos en la página
    this.submitted = true;
  }

  // Método para verificar si el formulario es válido
  isFormValid() {
    return this.formData.country.trim() !== '' && this.formData.province.trim() !== '' && this.photoData !== null;
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
}
