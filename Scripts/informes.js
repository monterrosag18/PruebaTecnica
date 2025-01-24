// Agrega un event listener para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Objeto con opciones comunes que se aplicarán a todos los gráficos
    const commonOptions = {
        // Permite que el gráfico sea responsive
        responsive: true,
        // No mantiene una relación de aspecto fija
        maintainAspectRatio: false,
        // Configuración de plugins
        plugins: {
            // Configuración de la leyenda
            legend: {
                // Posiciona la leyenda en la parte inferior
                position: 'bottom',
                // Configuración de las etiquetas de la leyenda
                labels: {
                    // Ancho de las cajas de color
                    boxWidth: 12,
                    // Espaciado entre elementos
                    padding: 15,
                    // Configuración de la fuente
                    font: {
                        // Tamaño de fuente responsivo
                        size: window.innerWidth < 768 ? 10 : 12
                    }
                }
            }
        }
    };

    // Creación del gráfico circular de departamentos
    const departmentChart = new Chart(
        // Obtiene el elemento canvas por su ID
        document.getElementById('departmentChart'),
        {
            // Define el tipo de gráfico como dona
            type: 'doughnut',
            // Datos del gráfico
            data: {
                // Etiquetas para cada sección
                labels: ['TTD', 'RRHH', 'Finanzas', 'Operaciones', 'Marketing'],
                // Conjunto de datos
                datasets: [{
                    // Valores para cada sección
                    data: [30, 20, 15, 25, 10],
                    // Colores de fondo para cada sección
                    backgroundColor: [
                        '#DC0032',
                        '#2C3E50',
                        '#3498DB',
                        '#27AE60',
                        '#F1C40F'
                    ]
                }]
            },
            // Opciones específicas para este gráfico
            options: {
                // Extiende las opciones comunes
                ...commonOptions,
                // Configuración específica de plugins
                plugins: {
                    // Extiende la configuración común de plugins
                    ...commonOptions.plugins,
                    // Configuración específica de la leyenda
                    legend: {
                        // Extiende la configuración común de la leyenda
                        ...commonOptions.plugins.legend,
                        // Muestra la leyenda solo en pantallas mayores a 480px
                        display: window.innerWidth > 480
                    }
                }
            }
        }
    );

    // Creación del gráfico de línea para contrataciones
    const hiringChart = new Chart(
        // Obtiene el elemento canvas por su ID
        document.getElementById('hiringChart'),
        {
            // Define el tipo de gráfico como línea
            type: 'line',
            // Datos del gráfico
            data: {
                // Etiquetas para el eje X (meses)
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                // Conjunto de datos
                datasets: [{
                    // Nombre del conjunto de datos
                    label: 'Contrataciones',
                    // Valores para cada mes
                    data: [5, 8, 12, 7, 9, 12],
                    // Color de la línea
                    borderColor: '#DC0032',
                    // Suavizado de la línea
                    tension: 0.4
                }]
            },
            // Opciones específicas para este gráfico
            options: {
                // Extiende las opciones comunes
                ...commonOptions,
                // Configuración de las escalas
                scales: {
                    // Configuración del eje X
                    x: {
                        // Configuración de las marcas
                        ticks: {
                            // Rotación máxima de las etiquetas
                            maxRotation: 45,
                            // Rotación mínima de las etiquetas
                            minRotation: 45,
                            // Configuración de la fuente
                            font: {
                                // Tamaño de fuente responsivo
                                size: window.innerWidth < 768 ? 8 : 10
                            }
                        }
                    },
                    // Configuración del eje Y
                    y: {
                        // Comienza desde cero
                        beginAtZero: true,
                        // Configuración de las marcas
                        ticks: {
                            // Configuración de la fuente
                            font: {
                                // Tamaño de fuente responsivo
                                size: window.innerWidth < 768 ? 8 : 10
                            }
                        }
                    }
                }
            }
        }
    );

    // Agrega un event listener para el evento de redimensionamiento de ventana
    window.addEventListener('resize', () => {
        // Determina si es una pantalla móvil
        const isMobile = window.innerWidth < 768;
        // Determina si es una pantalla móvil pequeña
        const isSmallMobile = window.innerWidth < 480;
        
        // Actualiza los tamaños de fuente para ambos gráficos
        [departmentChart, hiringChart].forEach(chart => {
            // Actualiza la configuración de la leyenda si existe
            if (chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            }
            
            // Actualiza la configuración de las escalas si existen
            if (chart.options.scales) {
                chart.options.scales.x.ticks.font.size = isMobile ? 8 : 10;
                chart.options.scales.y.ticks.font.size = isMobile ? 8 : 10;
            }
        });

        // Actualiza la visibilidad de la leyenda para el gráfico de departamentos
        departmentChart.options.plugins.legend.display = !isSmallMobile;

        // Actualiza ambos gráficos con los nuevos cambios
        departmentChart.update();
        hiringChart.update();
    });
}); 