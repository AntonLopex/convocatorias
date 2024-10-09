document.addEventListener('DOMContentLoaded', () => {
    const jugadores = [
        "Alvaro", "Lucas Aller", "Izan Fernández", "Lois Golán", 
        "Marta Buján", "Xan Sieira", "Uxía Sieira", "Dani Hernández", 
        "Adán Gudea", "Adan Vázquez", "Darío Lema", "María Quintás", 
        "Nuno Castaño"
    ];

    const jugadoresContainer = document.getElementById('jugadores-container');

    // Generar los checkboxes de los jugadores
    jugadores.forEach(jugador => {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = jugador;
        checkbox.value = jugador;

        const label = document.createElement('label');
        label.htmlFor = jugador;
        label.textContent = jugador;

        div.appendChild(checkbox);
        div.appendChild(label);
        jugadoresContainer.appendChild(div);
    });

    // Botón "Seleccionar Todo"
    const selectAllButton = document.getElementById('select-all');
    selectAllButton.addEventListener('click', () => {
        document.querySelectorAll('#jugadores-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    // Procesar el formulario
    const form = document.getElementById('convocatoria-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const fecha = document.getElementById('fecha').value;
        const campo = document.getElementById('campo').value;
        const horaReunión = document.getElementById('hora-reunión').value;
        const horaPartido = document.getElementById('hora-partido').value;
        const rival = document.getElementById('rival').value;

        // Obtener jugadores seleccionados
        const seleccionados = jugadores
            .filter(jugador => document.getElementById(jugador).checked)
            .join('\n');

        // Formatear el resultado con saltos de línea
        const resultado = `
📆 ${fecha}
🏟️ ${campo}
⏰ ${horaReunión} - ${horaPartido}
⚽️ vs ${rival}

${seleccionados}
        `;
        
        document.getElementById('resultado').textContent = resultado;
    });
});