document.addEventListener('DOMContentLoaded', () => {
    const jugadores = [
        "Alvaro Pérez (P)","David Barros (P)", "Lucas Aller (P)", "Lois Golán", 
        "Martín Mujico", "Adrián Díaz", "Dani Hernández", 
        "Adán Viña", "Adrián Resioy", "Mauro Rodriguez", "Darío Lema", "Lois Cea", "Martina Baca",
        "Natalia Boga", "Sira Balmaseda", "Adián Fernández", "Lucas Rodríguez"
    ]

    const jugadoresInf = [
        "Teo Sisto Martiz",
        "Tristán Devesa",
        "Rodrigo Rodriguez (P)",
        "Andrés Pájaro",
        "Daniel Mosquera",
        "Anxo Rodríguez Vila",
        "Lucas Folgoso",
        "Lionel Sanchez",
        "Mateo Ferreiro (P)",
        "Juan Carlos Botana",
        "Mateo Bergamini (P)",
        "Martin Arizaga",
        "Tomás de Moura",
        "Erik Sabel",
        "David Costa",
        "Rodrigo Otero",
        "Edgar Casal",
        "Brais Otero",
        "Diego Rodri.",
        "Leo Oreiro",
        "Aldara Liste",
        "Alba Martinez",
        "Carmen Quintas",
        "Daniel González"
    ]

    const jugadoresContainer = document.getElementById('jugadores-container')

    // currentJugadores mantiene la lista que se está mostrando (alevín por defecto)
    let currentJugadores = jugadores

    // Función para renderizar checkboxes a partir de un array de nombres
    function renderJugadores(lista) {
        jugadoresContainer.innerHTML = ''
        lista.forEach(jugador => {
            const div = document.createElement('div')
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.id = jugador
            checkbox.value = jugador

            const label = document.createElement('label')
            label.htmlFor = jugador
            label.textContent = jugador

            div.appendChild(checkbox)
            div.appendChild(label)
            jugadoresContainer.appendChild(div)
        })
    }
    // No renderizamos la lista al cargar: solo mostramos el select inicialmente.
    // La lista se renderizará cuando el usuario escoja una categoría.
    const playersSection = document.getElementById('players-section')
    const categoriaSelect = document.getElementById('categoria-select')
    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', () => {
            if (categoriaSelect.value === 'infantil') {
                currentJugadores = jugadoresInf
            } else {
                currentJugadores = jugadores
            }
            // Renderizar y mostrar la sección de jugadores
            renderJugadores(currentJugadores)
            if (playersSection) playersSection.style.display = 'block'
        })
    }

    // Botón "Seleccionar Todo"
    const selectAllButton = document.getElementById('select-all')
    selectAllButton.addEventListener('click', () => {
        document.querySelectorAll('#jugadores-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true
        })
    })

    // Mostrar u ocultar "Ubicación do Campo" según el checkbox "fora de casa"
    const foraDeCasaCheckbox = document.getElementById('fora-de-casa')
    const ubicacionContainer = document.getElementById('ubicacion-container')

    foraDeCasaCheckbox.addEventListener('change', () => {
        if (foraDeCasaCheckbox.checked) {
            ubicacionContainer.style.display = 'block'
        } else {
            ubicacionContainer.style.display = 'none'
        }
    })

    // Procesar el formulario
    const form = document.getElementById('convocatoria-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        
        let fecha = document.getElementById('fecha').value
        if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const [year, month, day] = fecha.split('-')
            fecha = `${day}/${month}/${year}`
        }        
        const campo = document.getElementById('campo').value
        const horaReunión = document.getElementById('hora-reunión').value
        const horaPartido = document.getElementById('hora-partido').value
        const rival = document.getElementById('rival').value

        // Obtener jugadores seleccionados usando la lista actual (alevín o infantil)
        // Queremos que los jugadores con '(P)' aparezcan primeros manteniendo el orden relativo.
        const selectedKeepers = []
        const selectedOthers = []
        currentJugadores.forEach(jugador => {
            const el = document.getElementById(jugador)
            if (el && el.checked) {
                if (jugador.includes('(P)')) selectedKeepers.push(jugador)
                else selectedOthers.push(jugador)
            }
        })
        const combinedSelected = [...selectedKeepers, ...selectedOthers]
        const seleccionados = combinedSelected.map((jugador, index) => `${index + 1}. ${jugador}`).join('\n')

        // Obtener la ubicación si "fora de casa" está marcado
        let ubicacion = ''
        if (foraDeCasaCheckbox.checked) {
            ubicacion = document.getElementById('ubicacion').value.trim()
            if (ubicacion) {
                ubicacion = `📍 Ubicación do campo: ${ubicacion}\n`
            }
        }

    // Cabecera dinámica según categoría seleccionada
    const categoriaValue = (categoriaSelect && categoriaSelect.value) ? categoriaSelect.value : 'alevin'
    const categoriaLabel = categoriaValue === 'infantil' ? 'INFANTIL B' : 'ALEVÍN B'

    // Formatear el resultado con saltos de línea
    const resultado = `
*${categoriaLabel}* ❗
📆 ${fecha}
🏟️ ${campo}
⏰ Convocatoria: ${horaReunión} - Partido ás: ${horaPartido}
⚽️ vs ${rival}

${seleccionados}
${ubicacion}
    `
        
        document.getElementById('resultado-texto').textContent = resultado
        document.getElementById('copy-button').style.display = 'block'
    })

    // Copiar al portapapeles
    const copyButton = document.getElementById('copy-button')
    copyButton.addEventListener('click', () => {
        const resultadoTexto = document.getElementById('resultado-texto').textContent
        navigator.clipboard.writeText(resultadoTexto).then(() => {
            //alert('Convocatoria copiada al portapapeles')
        }).catch(err => {
            alert('Error al copiar: ' + err)
        })
    })
})
