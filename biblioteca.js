console.log("=== SISTEMA DE GESTIÓN DE BIBLIOTECA ===\n");

// Base de datos de libros
const libros = [
    { id: 1, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", genero: "Programación", disponible: true },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", genero: "Programación", disponible: false },
    { id: 3, titulo: "The Pragmatic Programmer", autor: "Andrew Hunt", genero: "Programación", disponible: true },
    { id: 4, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true },
    { id: 5, titulo: "To Kill a Mockingbird", autor: "Harper Lee", genero: "Ficción", disponible: false }
];

// Sistema de gestión
const biblioteca = {
    // Obtener libros disponibles
    obtenerDisponibles() {
        return libros.filter(libro => libro.disponible);
    },

    // Buscar libros por título o autor
    buscar(criterio) {
        const termino = criterio.toLowerCase();
        return libros.filter(libro =>
            libro.titulo.toLowerCase().includes(termino) ||
            libro.autor.toLowerCase().includes(termino)
        );
    },

    // Prestar libro
    prestar(id) {
        const libro = libros.find(l => l.id === id);
        if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
        if (!libro.disponible) return { exito: false, mensaje: "Libro no disponible" };

        libro.disponible = false;
        return { exito: true, mensaje: `Libro "${libro.titulo}" prestado exitosamente` };
    },

    // Devolver libro
    devolver(id) {
        const libro = libros.find(l => l.id === id);
        if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
        if (libro.disponible) return { exito: false, mensaje: "Este libro ya está disponible" };

        libro.disponible = true;
        return { exito: true, mensaje: `Libro "${libro.titulo}" devuelto exitosamente` };
    },

    // Estadísticas
    obtenerEstadisticas() {
        const total = libros.length;
        const disponibles = libros.filter(l => l.disponible).length;
        const prestados = total - disponibles;

        // Agrupar por género usando reduce
        const porGenero = libros.reduce((acc, libro) => {
            acc[libro.genero] = (acc[libro.genero] || 0) + 1;
            return acc;
        }, {});

        return { total, disponibles, prestados, porGenero };
    }
};

// Demostraciones prácticas
console.log("📚 LIBROS DISPONIBLES:");
biblioteca.obtenerDisponibles().forEach(({ titulo, autor }) => {
    console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n🔍 BÚSQUEDA 'JavaScript':");
biblioteca.buscar("JavaScript").forEach(({ titulo, autor }) => {
    console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n📊 ESTADÍSTICAS:");
const stats = biblioteca.obtenerEstadisticas();
console.log(`Total de libros: ${stats.total}`);
console.log(`Disponibles: ${stats.disponibles}`);
console.log(`Prestados: ${stats.prestados}`);
console.log("Por género:", stats.porGenero);

console.log("\n📖 OPERACIONES DE PRÉSTAMO:");
console.log(biblioteca.prestar(1).mensaje);
console.log(biblioteca.prestar(1).mensaje); // Intento fallido
console.log(biblioteca.devolver(1).mensaje);

console.log("\n=== DEMOSTRACIÓN DE DESTRUCTURING ===\n");

// Función que usa destructuring extensivamente
function procesarPrestamo({ id, titulo, autor, disponible }) {
    if (!disponible) {
        return `❌ "${titulo}" no está disponible`;
    }

    const resultado = biblioteca.prestar(id);
    return resultado.exito ? `✅ ${resultado.mensaje}` : `❌ ${resultado.mensaje}`;
}

// Procesar múltiples libros con destructuring
const librosParaProcesar = [
    { id: 1, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", disponible: true },
    { id: 4, titulo: "1984", autor: "George Orwell", disponible: true }
];

librosParaProcesar.forEach(libro => {
    console.log(procesarPrestamo(libro));
});

// Destructuring en bucles
console.log("\n📋 LISTADO DE LIBROS CON DESTRUCTURING:");
for (const { titulo, autor, genero, disponible } of libros) {
    const estado = disponible ? "✅ Disponible" : "❌ Prestado";
    console.log(`${titulo} - ${autor} (${genero}) ${estado}`);
}

// Estadísticas avanzadas usando métodos modernos
console.log("\n🎯 ANÁLISIS AVANZADO:");
const librosPorGenero = libros.reduce((acc, { genero, disponible }) => {
    if (!acc[genero]) acc[genero] = { total: 0, disponibles: 0 };
    acc[genero].total++;
    if (disponible) acc[genero].disponibles++;
    return acc;
}, {});

Object.entries(librosPorGenero).forEach(([genero, stats]) => {
    console.log(`${genero}: ${stats.disponibles}/${stats.total} disponibles`);
});

/*Ejercicio: Extiende el sistema de biblioteca agregando funcionalidades como: 
búsqueda avanzada por múltiples criterios, 
sistema de usuarios con historial de préstamos, 
cálculo de multas por retrasos, 
y reportes de popularidad de libros. 
Usa destructuring, métodos modernos de arrays y objetos para implementar 
estas características.*/

const librosNuevos = [
    { id: 6, titulo: "El Extranjero", autor: "Albert Camus", genero: "Ficción", disponible: true },
    { id: 7, titulo: "Crimen y Castigo", autor: "Fiódor Dostoievski", genero: "Ficción", disponible: false },
    { id: 8, titulo: "The Great Gatsby", autor: "F. Scott Fitzgerald", genero: "Clásico", disponible: true },
    { id: 9, titulo: "The Mythical Man-Month", autor: "Frederick Brooks Jr.", genero: "Programación", disponible: true },
    { id: 10, titulo: "Sapiens: De animales a dioses", autor: "Yuval Noah Harari", genero: "Historia", disponible: false }
];

librosNuevos.forEach((libro) => {
    libros.push(libro);
});

biblioteca.busquedaAvanzada = function (autor, genero, titulo) {

    let encontrados = 0;
    autor = autor.toLowerCase();
    genero = genero.toLowerCase();
    titulo = titulo.toLowerCase();
    libros.filter(libro =>
        libro.titulo.toLowerCase().includes(titulo) &&
        libro.autor.toLowerCase().includes(autor) &&
        libro.genero.toLowerCase().includes(genero)
    ).forEach(({ titulo, autor, genero }) => {
        console.log(`Se ha encontrado el libro:\nTítulo: ${titulo}\nAutor: ${autor}\nGénero: ${genero}`);
        encontrados++;
    });

    if (encontrados === 0) {
        console.log('No hay resultados.');
    }

}

console.log("\n🔍 BÚSQUEDA con varios criterios 'Albert', 'Ficción', 'El':");
biblioteca.busquedaAvanzada('Albert', 'Ficción', 'El');

console.log("\n🔍 BÚSQUEDA con varios criterios 'Byung', 'Ensayo', 'cansancio':");
biblioteca.busquedaAvanzada('Byung', 'Ensayo', 'cansancio');


const usuarios = [
    { id: 1, nombre: 'Pepe', },
    { id: 2, nombre: 'Canelita', },
    { id: 3, nombre: 'Eustaquio', },
    { id: 4, nombre: 'Petronila', },
];

const verificarIdUsuario = (id) => {
    filtrado = usuarios.filter(usuario => usuario.id === id);
    if (filtrado.length > 0) {
        return true;
    } else {
        return false;
    }
};


const prestamos = [];

const generarPrestamo = (idLibro, idUsuario) => {

    const usuario = verificarIdUsuario(idUsuario);
    if (usuario) {
        const prestamo = biblioteca.prestar(idLibro);
        console.log(prestamo.mensaje)
        if (prestamo.exito) {
            fechaPrestamo = new Date();
            registro = { idLibro: idLibro, idUsuario: idUsuario, fechaPrestamo: fechaPrestamo, estado: 'ACTIVO', };
            prestamos.push(registro);
        }
    } else {
        console.log(`Id de usuario '${idUsuario}' no encontrado.`);
    }


};

const terminarPrestamo = (idLibro, idUsuario) => {

    const usuario = verificarIdUsuario(idUsuario);
    if (usuario) {
        const devolver = biblioteca.devolver(idLibro);
        console.log(devolver.mensaje)
        if (devolver.exito) {
            fechaDevolucion = new Date();
            const registro = prestamos.find(r => r.idLibro === idLibro);
            registro.estado = 'TERMINADO';
        }
    } else {
        console.log(`Id de usuario '${idUsuario}' no encontrado.`);
    }


};

console.log("\n📚 PRESTAMO DE LIBROS:");
generarPrestamo(6, 3);
generarPrestamo(6, 2);
generarPrestamo(9, 2);
generarPrestamo(6, 1);
generarPrestamo(8, 4);
generarPrestamo(1, 1)

const prestamosActivos = (idUsuario) => {

    if (verificarIdUsuario(idUsuario)) {
        let activo = []
        prestamos.forEach((prestamo) => {
            if (prestamo.idUsuario === idUsuario && prestamo.estado === 'ACTIVO') {
                activo.push(prestamo);
            }
        });

        if (activo.length === 0) {
            console.log(`El usuario ${idUsuario} no registra prestamos.`);
        } else {
            console.log(`El usuario ${idUsuario} tiene estos prestamos activos:`)
            activo.forEach(({ idLibro, fechaPrestamo }) => {
                console.log(`ID LIBRO ${idLibro} - FECHA PRESTAMO ${fechaPrestamo}.`);
            });
        }

    } else {
        console.log('Usuario no registrado.');
    }

};

console.log("\n📚 PRESTAMOS ACTIVOS POR ID DE USUARIO:");
prestamosActivos(3);
prestamosActivos(2);
prestamosActivos(10);


const multasPorUsuario = (idUsuario) => {

    const fechaHoy = new Date()
    const msPorDia = 1000 * 60 * 60 * 24;
    const diferencia7Dias = msPorDia * 7;

    if (verificarIdUsuario(idUsuario)) {
        let multas = [];
        let diasMulta;
        prestamos.forEach((prestamo) => {
            if (prestamo.idUsuario === idUsuario && prestamo.estado === 'ACTIVO') {
                let diferenciaFechas = fechaHoy.getTime() - prestamo.fechaPrestamo.getTime();
                if (diferenciaFechas >= diferencia7Dias) {
                    multas.push(prestamo);
                    diasMulta = (diferenciaFechas / msPorDia)
                }
            }
        });

        if (multas.length === 0) {
            console.log(`El usuario ${idUsuario} no registra multas.`);
        } else {
            console.log(`\nEl usuario ${idUsuario} tiene estas multas:`)
            multas.forEach(({ idLibro, fechaPrestamo }) => {
                console.log(`ID LIBRO ${idLibro} - FECHA PRESTAMO ${fechaPrestamo}. Tiene atraso de ${diasMulta} días.`);
            });
        }

    } else {
        console.log('Usuario no registrado');
    }

};

console.log('\nIntroduciremos una fecha con multa a propósito al usuario ID 3');
const fechaHoy = new Date()
const msPorDia = 1000 * 60 * 60 * 24;
prestamos[0].fechaPrestamo = new Date(fechaHoy.getTime() - (8 * msPorDia));

multasPorUsuario(3);

console.log('\n 📋📚Para efectos de la popularidad de los libros, se agrega registro de devolución.');
console.log('Y otras operaciones para generar historial. \n')
terminarPrestamo(8, 4);
terminarPrestamo(6, 3);
generarPrestamo(6, 4);

const popularidadLibros = function () {
    let pedidos = [];
    for (let { idLibro } of prestamos) {
        pedidos.push(idLibro);
    }

    const contador = pedidos.reduce((contadorPorLibro, idLibro) => {
        contadorPorLibro[idLibro] = (contadorPorLibro[idLibro] || 0) + 1;
        return contadorPorLibro;
    }, {});

    let aux=0;
    let idPopular;
    for (let idLibro of pedidos){
        if (contador[idLibro]>aux){
            aux=contador[idLibro]
            idPopular=idLibro
        }
    };
    const libro=libros.find(libro=>libro.id===idPopular);
    console.log(`El libro más popular es ${libro.titulo} de ${libro.autor}.`)
}

console.log("\n📊LIBRO MÁS PEDIDO:");
popularidadLibros();