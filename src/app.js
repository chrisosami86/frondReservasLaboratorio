
import htmlForm from "./formularioHTML.html?raw";
import { initializeFormLogic } from "./logicaForm";

export const App = (elementId) => {
    (async () => {  // Haciendo la función autoinvocada async
        const app = document.createElement('div');
        app.innerHTML = htmlForm; // Insertando el HTML en crudo
        document.querySelector(elementId).append(app);

        // Llamar a initializeFormLogic de manera asincrónica
        await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms antes de ejecutar la lógica
        await initializeFormLogic(); // Invocar la lógica después de que el HTML esté cargado
    })();
}

