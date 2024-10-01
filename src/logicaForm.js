export function initializeFormLogic() {
    const reservationForm = document.querySelector('#reservation-form');
    const reservationDateInput = document.querySelector('#reservation-date');
    const timeSlotSelect = document.querySelector('#time-slot');
    const loadingScreen = document.querySelector('#loading-screen');

    // Obtener el campo de fecha y hora actual
    const currentDatetimeInput = document.querySelector('#current-datetime');
    const now = new Date();
    currentDatetimeInput.value = now.toLocaleString();

    // Escuchar cambios en la fecha de reserva para validar intervalos disponibles
    reservationDateInput.addEventListener('change', async (event) => {
        const selectedDate = event.target.value;

        try {
            const response = await fetch('https://back-reservas-laboratorio.vercel.app/validate-intervals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedDate }),
            });

            if (response.ok) {
                const { availableIntervals } = await response.json();

                // Limpiar las opciones previas
                timeSlotSelect.innerHTML = '';

                // Añadir intervalos disponibles al select
                availableIntervals.forEach((interval) => {
                    const option = document.createElement('option');
                    option.value = interval.id;
                    option.textContent = `De ${interval.start} a ${interval.end}`;
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
        event.preventDefault();

        // Mostrar la pantalla de carga
        loadingScreen.style.display = 'flex';

        const teacherName = document.querySelector('#teacher-name').value;
        const program = document.querySelector('#program').value;
        const subject = document.querySelector('#subject').value;
        const reservationDate = document.querySelector('#reservation-date').value;
        const timeSlotId = document.querySelector('#time-slot').value;
        const observations = document.querySelector('#Observations').value;

        if (!teacherName || !program || !subject || !reservationDate || !timeSlotId || !observations) {
            alert('Por favor completa todos los campos.');
            loadingScreen.style.display = 'none'; // Ocultar la pantalla de carga si falla la validación
            return;
        }

        const reservationData = {
            currentDatetime: currentDatetimeInput.value,  // Aquí envías el valor correcto
            teacherName,
            program,
            subject,
            reservationDate,
            timeSlotId,
            observations,
        };

        try {
            const response = await fetch('https://back-reservas-laboratorio.vercel.app/register-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                alert('Reserva registrada correctamente.');
                reservationForm.reset();
                currentDatetimeInput.value = new Date().toLocaleString();
                const calendar = document.querySelector('#calendarIframe');
                calendar.src = calendar.src; // Refrescar el calendario
            } else {
                alert('Hubo un problema al registrar la reserva.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error de red. Inténtalo nuevamente.');
        } finally {
            loadingScreen.style.display = 'none'; // Ocultar la pantalla de carga
        }
    });
}
