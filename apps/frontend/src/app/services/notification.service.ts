import { Injectable } from '@angular/core';
import { NotificationUtilService, Icon, Type } from '@nx-angular/utils';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends NotificationUtilService {

  constructor() {
    super()
  }

  notify(status: number, message: any): void {
    switch(status) {
      // 0 - Unknown error
      case 0: {
        this.configAlert(Icon.danger, 'El dominio de los servicios no está respondiendo', Type.danger)
        break
      }
      // 500 - Internal server error
      case 500: {
        this.configAlert(Icon.danger, 'Servicio no disponible', Type.danger)
        break
      }
      // 401 - Unauthorized
      case 401: {
        if (message === 'unauthorized') {
          this.configAlert(Icon.warning, 'Tu sesión ha expirado', Type.warning)
        } else if (message === 'invalid_token') {
          this.configAlert(Icon.warning, 'Token inválido', Type.warning)
        }
        break
      }
      // 400 - Bad request
      case 400: {
        if (message === 'invalid_grant') {
          this.configAlert(Icon.danger, 'Datos incorrectos', Type.danger)
        } else if (message === 'El registro no existe!') {
          this.configAlert(Icon.warning, 'No se han encontrado datos', Type.warning)
        } else if (message === 'El password actual no coincide!') {
          this.configAlert(Icon.danger, 'Contraseña actual incorrecta', Type.danger)
        } else if (message === 'Las contraseñas no coinciden') {
          this.configAlert(Icon.danger, 'Las contraseñas no coinciden', Type.danger)
        } else if (message === 'Ya existe asistencias con esta fecha') {
          this.configAlert(Icon.warning, 'Ya existen asistencias con esta fecha', Type.warning)
        } else if (message === 'Ya existe un proceso con estos datos') {
          this.configAlert(Icon.warning, 'Ya se han procesado las asistencias de la fecha seleccionada', Type.warning)
        } else if (message === 'Ya existe el personal registrado') {
          this.configAlert(Icon.warning, 'El personal ya se encuentra registrado', Type.warning)
        }
        break
      }
      // 417 - Exception failed
      case 417: {
        if (message.includes('Ya existe una carga del archivo :')) {
          this.configAlert(Icon.danger, message, Type.danger)
        }
        break
      }
      // 404 - Not found
      case 404: {
        this.configAlert(Icon.danger, message, Type.danger)
        break
      }
      default: {
        this.configAlert(Icon.danger, 'Error inesperado', Type.danger)
        break
      }
    }
  }
}
