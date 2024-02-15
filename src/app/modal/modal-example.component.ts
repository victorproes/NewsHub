import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal-example.component.html',
})
export class ModalExampleComponent {
  pais: string | undefined;
  provincia: string | undefined;
  selectedFile: File | null = null;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage // Inyecta el servicio de almacenamiento
  ) {}

  async ngOnInit() {
    // Inicializa el almacenamiento
    await this.storage.create();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    // Guarda los datos localmente
    const data = {
      pais: this.pais,
      provincia: this.provincia,
      foto: this.selectedFile ? await this.convertFileToBase64(this.selectedFile) : null
    };

    await this.storage.set('formData', data);

    return this.modalCtrl.dismiss(data, 'confirm');
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  // Método para convertir el archivo a una cadena base64
  async convertFileToBase64(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(null);
      };
      reader.readAsDataURL(file);
    });
  }
}
