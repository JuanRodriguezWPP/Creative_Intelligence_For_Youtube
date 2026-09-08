import { Storage, File } from '@google-cloud/storage';
import { CONFIG } from './config';

// Inicializamos el cliente oficial de Google Cloud.
// Esto automáticamente buscará la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
// o usará los permisos por defecto si corre dentro de GCP.
const storage = new Storage();
const bucket = storage.bucket(CONFIG.cloudStorage.bucket);

export class StorageManager {
  /**
   * Descarga un archivo del bucket.
   * Si asString es true, devuelve el texto. Si es false, devuelve un Buffer (bytes).
   */
  static async loadFile(
    filePath: string,
    asString = false
  ): Promise<string | Buffer | null> {
    try {
      const file: File = bucket.file(filePath);
      
      // Verifica si existe antes de descargar para no arrojar un error que rompa el server
      const [exists] = await file.exists();
      if (!exists) {
        return null;
      }

      const [content] = await file.download();
      return asString ? content.toString('utf-8') : content;
    } catch (error) {
      console.error(`Error loading file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Lista objetos en el bucket.
   * Si hay delimiter (como '/'), devuelve las subcarpetas.
   * Si no hay delimiter, devuelve todos los archivos recursivamente.
   */
  static async listObjects(delimiter = '/', prefix?: string): Promise<string[]> {
    try {
      const options: any = {};
      if (delimiter) options.delimiter = delimiter;
      if (prefix) options.prefix = prefix;

      // El SDK nos devuelve los archivos en el primer array, 
      // y la metadata de la API en el tercero (donde vienen las carpetas si usamos delimiter)
      const [files, , apiResponse] = await bucket.getFiles(options);

      if (delimiter) {
        // Devuelve las subcarpetas (ej. ["video1/", "video2/"]) quitándoles el prefijo
        const responseData = apiResponse as any;
        return (responseData?.prefixes || []).map((p: string) => 
          p.replace(prefix ?? '', '').split('/')[0]
        );
      }
      
      // Devuelve la ruta completa de todos los archivos
      return files.map(f => f.name);
    } catch (error) {
      console.error(`Error listing objects with prefix ${prefix}:`, error);
      return [];
    }
  }

  /**
   * Sube un archivo usando base64.
   */
  static async uploadFile(
    base64EncodedContent: string,
    folder: string,
    filename = 'input.mp4',
    contentType = 'video/mp4'
  ): Promise<void> {
    try {
      // En Node.js usamos Buffers para manejar datos binarios
      const buffer = Buffer.from(base64EncodedContent, 'base64');
      const fullName = `${folder}/${filename}`;
      
      const file = bucket.file(fullName);
      await file.save(buffer, {
        contentType: contentType,
        resumable: false // Subida directa, más rápida para archivos pequeños/medianos
      });
      
      console.log(`Uploaded ${filename} to ${bucket.name}/${fullName}`);
    } catch (error) {
      console.error(`Error uploading file ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Elimina un archivo individual.
   */
  static async deleteFile(filePath: string): Promise<void> {
    try {
      await bucket.file(filePath).delete({ ignoreNotFound: true });
      console.log(`Deleted file ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
    }
  }

  /**
   * Renombra (mueve) un archivo dentro del bucket.
   */
  static async renameFile(filePath: string, destinationPath: string): Promise<void> {
    try {
      await bucket.file(filePath).move(destinationPath);
      console.log(`Renamed file ${filePath} to ${destinationPath}`);
    } catch (error) {
      console.error(`Error renaming file ${filePath}:`, error);
    }
  }

  /**
   * Elimina una carpeta completa iterando sobre sus archivos.
   */
  static async deleteFolder(folder: string): Promise<void> {
    try {
      // Al no pasar delimiter, nos devuelve TODOS los archivos dentro de la carpeta
      const files = await StorageManager.listObjects('', folder);
      
      // Eliminamos todos los archivos en paralelo usando Promise.all
      await Promise.all(
        files.map(file => StorageManager.deleteFile(file))
      );
      
      console.log(`Deleted video folder ${folder}`);
    } catch (error) {
      console.error(`Error deleting folder ${folder}:`, error);
    }
  }
}
