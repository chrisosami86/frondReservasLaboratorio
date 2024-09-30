
import htmlForm from "./formularioHTML.html?raw";
import { initializeFormLogic } from "./logicaForm";
export const App = (elementId) => {

    (() => {
        const app = document.createElement('div');
        app.innerHTML = htmlForm; // Insertando el HTML en crudo
        document.querySelector(elementId).append(app);

        setTimeout(() => {
            initializeFormLogic(); // Invocar la lógica después de que el HTML esté cargado
        }, 100); 
    })();
}

