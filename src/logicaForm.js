export function initializeFormLogic() {
    const reservationForm = document.querySelector('#reservation-form');
    const reservationDateInput = document.querySelector('#reservation-date');
    const timeSlotSelect = document.querySelector('#time-slot');

    // Obtener el campo de fecha y hora actual y rellenarlo automáticamente
    const currentDatetimeInput = document.querySelector('#current-datetime');
    const now = new Date();
    currentDatetimeInput.value = now.toLocaleString();

    // Escuchar cambios en el campo de fecha para validar intervalos ocupados
    reservationDateInput.addEventListener('change', async (event) => {
        const selectedDate = event.target.value;

        try {
            const response = await fetch('http://localhost:3000/validate-intervals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedDate }),
            });

            if (response.ok) {
                const { availableIntervals } = await response.json();

                // Limpiar las opciones del campo de intervalo de horas
                timeSlotSelect.innerHTML = '';

                // Añadir las opciones de intervalos disponibles al campo select
                availableIntervals.forEach((interval) => {
                    const option = document.createElement('option');
                    option.value = interval.id; // Usar el identificador como valor
                    option.textContent = `De ${interval.start} a ${interval.end}`; // Mostrar los rangos de tiempo
                    timeSlotSelect.appendChild(option);
                });
            } else {
                alert('Error al obtener los intervalos disponibles.');
            }
        } catch (error) {
            console.error('Error al validar intervalos:', error);
            alert('Error de red. Inténtalo nuevamente.');
        }
    });

    // Escuchar el envío del formulario
    reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos
        const teacherName = document.querySelector('#teacher-name').value;
        const program = document.querySelector('#program').value;
        const subject = document.querySelector('#subject').value;
        const reservationDate = document.querySelector('#reservation-date').value;
        const timeSlotId = document.querySelector('#time-slot').value; // Obtener solo el identificador

        // Validar que no haya campos vacíos
        if (!teacherName || !program || !subject || !reservationDate || !timeSlotId) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Crear un objeto con los datos del formulario
        const reservationData = {
            teacherName,
            subject,
            reservationDate,
            timeSlotId, // Enviar solo el identificador
        };

        // Enviar los datos al servidor
        try {
            const response = await fetch('http://localhost:3000/register-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                alert('Reserva registrada correctamente.');
                // Opcionalmente, puedes limpiar el formulario después de enviarlo
                reservationForm.reset();
            } else {
                alert('Hubo un problema al registrar la reserva.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error de red. Inténtalo nuevamente.');
        }
    });
}
