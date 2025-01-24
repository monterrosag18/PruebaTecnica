// Agrega un event listener para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene referencias a elementos del DOM
    const modal = document.getElementById('modalNuevoCampo');
    const btnNuevoCampo = document.getElementById('btnNuevoCampo');
    const btnCancelar = document.getElementById('btnCancelar');
    const closeModal = document.querySelector('.close-modal');
    const formNuevoCampo = document.getElementById('formNuevoCampo');
    const btnExportar = document.getElementById('btnExportar');

    // Agrega event listener para abrir el modal
    btnNuevoCampo.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Define función para cerrar el modal
    const cerrarModal = () => {
        modal.style.display = 'none';
        formNuevoCampo.reset();
    };

    // Agrega event listeners para cerrar el modal
    btnCancelar.addEventListener('click', cerrarModal);
    closeModal.addEventListener('click', cerrarModal);

    // Cierra el modal al hacer clic fuera de él
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Maneja el envío del formulario
    formNuevoCampo.addEventListener('submit', (e) => {
        // Previene el comportamiento por defecto del formulario
        e.preventDefault();
        
        // Crea objeto con los datos del nuevo metadato
        const nuevoMetadato = {
            nombre: document.getElementById('nombreCampo').value,
            tipo: document.getElementById('tipoCampo').value,
            seccion: document.getElementById('seccionCampo').value,
            obligatorio: document.getElementById('campoObligatorio').checked
        };

        // Agrega el nuevo metadato y cierra el modal
        agregarNuevoMetadato(nuevoMetadato);
        cerrarModal();
    });

    // Agrega event listener para exportar la estructura
    btnExportar.addEventListener('click', exportarEstructura);
});

// Función para agregar un nuevo metadato a la tabla
function agregarNuevoMetadato(metadato) {
    // Busca la sección correspondiente
    const seccion = document.querySelector(`[data-seccion="${metadato.seccion}"]`);
    if (!seccion) return;

    // Obtiene el tbody de la tabla y crea nueva fila
    const tbody = seccion.querySelector('tbody');
    const tr = document.createElement('tr');
    
    // Define el HTML de la nueva fila
    tr.innerHTML = `
        <td>${metadato.nombre}</td>
        <td><span class="type-badge ${metadato.tipo}">${getTipoTexto(metadato.tipo)}</span></td>
        <td>${metadato.obligatorio ? '<i class="fas fa-check text-success"></i>' : ''}</td>
        <td class="actions">
            <button title="Editar"><i class="fas fa-edit"></i></button>
            <button title="Eliminar"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;

    // Agrega la fila y actualiza el contador
    tbody.appendChild(tr);
    actualizarContador(metadato.seccion);
}

// Función para obtener el texto descriptivo del tipo de campo
function getTipoTexto(tipo) {
    // Define mapeo de tipos
    const tipos = {
        text: 'Texto',
        date: 'Fecha',
        number: 'Número',
        select: 'Lista'
    };
    return tipos[tipo] || tipo;
}

// Función para actualizar el contador de campos en una sección
function actualizarContador(seccion) {
    // Obtiene elementos y actualiza el contador
    const seccionElement = document.querySelector(`[data-seccion="${seccion}"]`);
    const badge = seccionElement.querySelector('.badge');
    const filas = seccionElement.querySelectorAll('tbody tr').length;
    badge.textContent = `${filas} campos`;
}

// Función para exportar la estructura de metadatos
function exportarEstructura() {
    // Inicializa objeto para almacenar la estructura
    const estructura = {
        datosPersonales: [],
        datosLaborales: [],
        formacionAcademica: []
    };

    // Recolecta datos de cada sección
    document.querySelectorAll('.metadata-card').forEach(card => {
        const seccion = card.getAttribute('data-seccion');
        card.querySelectorAll('tbody tr').forEach(row => {
            const campo = {
                nombre: row.cells[0].textContent,
                tipo: row.cells[1].querySelector('.type-badge').classList[1],
                obligatorio: row.cells[2].querySelector('.fa-check') !== null
            };
            estructura[seccion].push(campo);
        });
    });

    // Crea y descarga el archivo JSON
    const blob = new Blob([JSON.stringify(estructura, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estructura_metadatos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}