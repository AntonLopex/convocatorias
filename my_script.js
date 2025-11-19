document.addEventListener('DOMContentLoaded', () => {
    const jugadores = [
        "Alvaro Pérez (P)","David Barros (P)", "Lucas Aller (P)", "Lois Golán", 
        "Martín Mujico", "Adrián Díaz", "Dani Hernández", 
        "Adán Viña", "Adrián Resioy", "Mauro Rodríguez", "Darío Lema", "Lois Cea", "Martina Baca",
        "Natalia Boga", "Sira Balmaseda", "Adrián Fernández", "Lucas Rodríguez"
    ]

    // Asigna aquí los números de camiseta para Alevín.
    // Rellena los valores con números únicos por jugador. Usa null o undefined si aún no tiene número.
    // Ej: "Alvaro Pérez (P)": 1,
    const numerosJugadores = {
        "Alvaro Pérez (P)": 99,
        "David Barros (P)": 1,
        "Lucas Aller (P)": 2,
        "Lois Golán": 17,
        "Martín Mujico": 14,
        "Adrián Díaz": 12,
        "Dani Hernández": 13,
        "Adán Viña": 22,
        "Adrián Resioy": 11,
        "Mauro Rodríguez": 7,
        "Darío Lema": 21,
        "Lois Cea": 3,
        "Martina Baca": 20,
        "Natalia Boga": 9,
        "Sira Balmaseda": 30,
        "Adrián Fernández": 16,
        "Lucas Rodríguez": 21
    }

    const jugadoresInf = [
        "Teo Sisto",
        "Tristán Devesa",
        "Rodrigo Rodriguez (P)",
        "Andrés Pájaro",
        "Daniel Mosquera",
        "Anxo Rodríguez",
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
        "Diego Rodríguez",
        "Leo Oreiro",
        "Aldara Liste",
        "Alba Martínez",
        "Carmen Quintás",
        "Daniel González"
    ]

    // Asigna aquí los números de camiseta para Infantil.
    const numerosJugadoresInf = {
        "Teo Sisto": 20,
        "Tristán Devesa": 8,
        "Rodrigo Rodriguez (P)": 13,
        "Andrés Pájaro": 14,
        "Daniel Mosquera": 19,
        "Anxo Rodríguez": 20,
        "Lucas Folgoso": 22,
        "Lionel Sanchez": 23,
        "Mateo Ferreiro (P)": 24,
        "Juan Carlos Botana": 25,
        "Mateo Bergamini (P)": 28,
        "Martin Arizaga": 31,
        "Tomás de Moura": 32,
        "Erik Sabel": 40,
        "David Costa": 45,
        "Rodrigo Otero": 55,
        "Edgar Casal": 7,
        "Brais Otero": 16,
        "Diego Rodríguez": 26,
        "Leo Oreiro": 99,
        "Aldara Liste": 27,
        "Alba Martínez": 8,
        "Carmen Quintás": 14,
        "Daniel González": 72
    }

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

        // Detectar dorsales duplicados entre los jugadores seleccionados
        // Elegir mapa correcto según la categoría actual
        const numerosMap = (categoriaSelect && categoriaSelect.value === 'infantil') ? numerosJugadoresInf : numerosJugadores

        // Construir mapa número -> jugadores
        const dorsalAPar = {}
        combinedSelected.forEach(jugador => {
            const num = numerosMap[jugador]
            if (num != null && num !== '') {
                if (!dorsalAPar[num]) dorsalAPar[num] = []
                dorsalAPar[num].push(jugador)
            }
        })

        // Buscar duplicados
        const duplicados = Object.entries(dorsalAPar).filter(([num, arr]) => arr.length > 1)
        if (duplicados.length > 0) {
            let msg = 'Conflicto de dorsales detectado:\n'
            duplicados.forEach(([num, arr]) => {
                msg += `Dorsal ${num}: ${arr.join(', ')}\n`
            })
            // Mostrar alerta con los jugadores que comparten número
            alert(msg)
        }

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
