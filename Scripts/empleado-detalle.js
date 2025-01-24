// Base de datos de empleados con URLs de imágenes reales
const empleadosDB = {
    '2345678': {
        nombre: 'Juan Pablo Cadavid Escobar',
        cargo: 'Desarrollador de Software',
        departamento: 'Tecnología y Transformación Digital - TTD',
        foto: 'https://st2.depositphotos.com/1930953/9069/i/450/depositphotos_90693862-stock-photo-portrait-of-a-caucasian-businessman.jpg',
        cedula: '2345678',
        fechaNacimiento: '15/08/1990',
        correo: 'juan.cadavid@empresa.com',
        fechaIngreso: '01/03/2020',
        tipoContrato: 'Contrato a Término Fijo',
        sede: 'Sede Medellín',
        modalidad: 'Presencial',
        estado: 'activo'
    },
    '3456789': {
        nombre: 'Esteban Arroyave Loaiza',
        cargo: 'Analista de Sistemas',
        departamento: 'Tecnología y Transformación Digital - TTD',
        foto: 'https://st2.depositphotos.com/1144472/5494/i/450/depositphotos_54946267-stock-photo-businessman-isolated-on-white.jpg',
        cedula: '3456789',
        fechaNacimiento: '22/04/1988',
        correo: 'esteban.arroyave@empresa.com',
        fechaIngreso: '15/06/2019',
        tipoContrato: 'Contrato Indefinido',
        sede: 'Sede Bogotá',
        modalidad: 'Híbrido',
        estado: 'activo'
    },
    '4567890': {
        nombre: 'María Gómez Pérez',
        cargo: 'Líder de Proyectos',
        departamento: 'Tecnología y Transformación Digital - TTD',
        foto: 'https://img.freepik.com/foto-gratis/empleada-feliz-sentada-oficina_1163-331.jpg',
        cedula: '4567890',
        fechaNacimiento: '10/12/1985',
        correo: 'maria.gomez@empresa.com',
        fechaIngreso: '01/01/2018',
        tipoContrato: 'Contrato Indefinido',
        sede: 'Sede Medellín',
        modalidad: 'Presencial',
        estado: 'activo'
    },
    '5678901': {
        nombre: 'Carlos Rodríguez López',
        cargo: 'Arquitecto de Software',
        departamento: 'Tecnología y Transformación Digital - TTD',
        foto: 'https://thumbs.dreamstime.com/b/hombre-sonriente-15580545.jpg',
        cedula: '5678901',
        fechaNacimiento: '05/03/1987',
        correo: 'carlos.rodriguez@empresa.com',
        fechaIngreso: '20/08/2017',
        tipoContrato: 'Contrato Indefinido',
        sede: 'Sede Bogotá',
        modalidad: 'Teletrabajo',
        estado: 'inactivo'
    }
};

// Función unificada para cambiar empleado
function cambiarEmpleado(empleadoId) {
    const empleado = empleadosDB[empleadoId];
    console.log('Cambiando a empleado:', empleado); // Para depuración
    
    if (empleado) {
        // Actualizar foto
        const imgElement = document.querySelector('.profile-photo img');
        if (imgElement) {
            imgElement.src = empleado.foto;
            imgElement.alt = `Foto de ${empleado.nombre}`;
        }

        // Actualizar nombre y detalles del encabezado
        const nombreElement = document.querySelector('.profile-info-header h2');
        if (nombreElement) {
            nombreElement.textContent = empleado.nombre;
        }

        const cargoElement = document.querySelector('.profile-position');
        if (cargoElement) {
            cargoElement.textContent = empleado.cargo;
        }

        const departamentoElement = document.querySelector('.profile-department');
        if (departamentoElement) {
            departamentoElement.textContent = empleado.departamento;
        }

        // Actualizar estado
        const statusElement = document.querySelector('.profile-status');
        if (statusElement) {
            statusElement.className = `profile-status ${empleado.estado}`;
            statusElement.innerHTML = `
                <span class="status-dot"></span>
                <span>${empleado.estado.charAt(0).toUpperCase() + empleado.estado.slice(1)}</span>
            `;
        }

        // Actualizar información en las tarjetas
        const infoCards = document.querySelectorAll('.info-card');
        
        // Información Personal
        if (infoCards[0]) {
            const valores = infoCards[0].querySelectorAll('.info-value');
            valores[0].textContent = empleado.cedula;
            valores[1].textContent = empleado.fechaNacimiento;
            valores[2].textContent = empleado.correo;
        }

        // Información Laboral
        if (infoCards[1]) {
            const valores = infoCards[1].querySelectorAll('.info-value');
            valores[0].textContent = empleado.cargo;
            valores[1].textContent = empleado.departamento;
            valores[2].textContent = empleado.fechaIngreso;
        }

        // Ubicación y Contrato
        if (infoCards[2]) {
            const valores = infoCards[2].querySelectorAll('.info-value');
            valores[0].textContent = empleado.tipoContrato;
            valores[1].textContent = empleado.sede;
            valores[2].textContent = empleado.modalidad;
        }

        // Actualizar título de la página
        document.title = `Portal de Información - ${empleado.nombre}`;

        // Actualizar selector de empleado
        const select = document.getElementById('employeeSelect');
        if (select) {
            select.value = empleadoId;
        }
    } else {
        console.error('No se encontró el empleado con ID:', empleadoId);
    }
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const empleadoId = urlParams.get('id');
    
    if (empleadoId && empleadosDB[empleadoId]) {
        cambiarEmpleado(empleadoId);
        initializeNavigation();
    } else {
        window.location.href = 'listado-empleados.html';
    }
});

// Asegurarnos de que el selector de empleados funcione
document.getElementById('employeeSelect')?.addEventListener('change', function(e) {
    const empleadoId = e.target.value;
    // Actualizar la URL con el nuevo ID
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('id', empleadoId);
    window.history.pushState({}, '', newUrl);
    
    cambiarEmpleado(empleadoId);
});

// Agregar botón de regresar
document.querySelector('.profile-header-wrapper').insertAdjacentHTML('afterbegin', `
    <a href="listado-empleados.html" class="btn-back">
        <i class="fas fa-arrow-left"></i>
        Volver al listado
    </a>
`);

// Manejar la navegación entre secciones
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.section-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al enlace clickeado
            link.classList.add('active');
            
            // Ocultar todas las secciones
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostrar la sección correspondiente
            const sectionId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
} 