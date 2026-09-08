import { StorageManager } from './storage';
import { VertexHelper } from './vertex';

async function runTests() {
  console.log('🧪 Iniciando pruebas de conexión...\n');

  // --- PRUEBA 1: Google Cloud Storage ---
  console.log('1️⃣  Probando StorageManager (Conexión al Bucket)');
  try {
    // Intentamos listar las carpetas de tu bucket
    const carpetas = await StorageManager.listObjects('/');
    console.log('✅ Éxito al conectar con Storage!');
    console.log(`Carpetas encontradas en el bucket: ${carpetas.length}`);
    if (carpetas.length > 0) {
      console.log(`Primeras 3 carpetas:`, carpetas.slice(0, 3));
    }
  } catch (error) {
    console.error('❌ Error en Storage:', error);
  }

  console.log('\n----------------------------------------\n');

  // --- PRUEBA 2: Vertex AI (Gemini) ---
  console.log('2️⃣  Probando VertexHelper (Conexión a la Inteligencia Artificial)');
  try {
    const promptPrueba = 'Responde exactamente con esta frase: "Hola, la conexión con Vertex AI funciona a la perfección".';
    console.log(`Enviando prompt: "${promptPrueba}"`);
    
    // Llamamos a Gemini
    const respuesta = await VertexHelper.generate(promptPrueba);
    
    console.log('\n✅ Éxito al conectar con Vertex AI!');
    console.log('🤖 Gemini dice:', respuesta);
  } catch (error) {
    console.error('❌ Error en Vertex AI:', error);
  }

  console.log('\n🏁 Pruebas finalizadas.');
}

// Ejecutamos la función
runTests();
