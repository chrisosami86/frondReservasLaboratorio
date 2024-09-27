
import  htmlForm from "./formularioHTML.html?raw";



const rutaCalendario = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FBogota&bgcolor=%23ffffff&src=Y19lNmRlZTk3NjFiNmFkMzJhNmYyYmUzMjAxODBmZmQ4ZTZkMzJkNTJhY2Q3NWEyMjQ2ZTVjNTJhN2Y2ODEzNDdiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4&color=%2333B679";
export const App = (elementId) => {    
    

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = htmlForm; //mandando la importacion de html en crudo
        document.querySelector(elementId).append(app);




        document.addEventListener('DOMContentLoaded', () => {
            const formulario = document.querySelector('.formularioGoogle');
        
            formulario.addEventListener('submit', async (event) => {
                event.preventDefault(); // Evita que el formulario se envíe automáticamente
        
                // Recoger los datos del formulario
                const docente = document.querySelector('#docente').value;
                const programa = document.querySelector('#programa').value;
                const materia = document.querySelector('#materia').value;
                const dia = document.querySelector('#dia').value;
                const horario = document.querySelector('#horario').value;
                const horas = document.querySelector('#horas').value;
        
                // Crear un objeto con los datos del formulario
                const reservaData = {
                    docente,
                    programa,
                    materia,
                    dia,
                    horario,
                    horas
                };
        
                // Enviar los datos al backend
                try {
                    const response = await fetch('http://localhost:3000/reservar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reservaData)
                    });
        
                    // Cambiar response.json() por response.text() porque el servidor responde con texto
                    const result = await response.text(); 
                    console.log(result); // Mostrar la respuesta del servidor
        
                    if (response.ok) {
                        alert('Reserva realizada con éxito.');
                        document.getElementById('formularioGoogle').reset();
                        document.querySelector('#calendarioGoogle').setAttribute("src", rutaCalendario);
                        
                    } else {
                        document.getElementById('formularioGoogle').reset();
                        alert('Error al realizar la reserva.');
                    }
        
                } catch (error) {
                    console.error('Error al enviar los datos:', error);
                }
            });
        });
        
        

    })();
}
