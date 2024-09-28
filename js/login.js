document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

  
    async function fetchUsers() {
        try {
            const response = await fetch('https://mokerony.github.io/taller/login.json'); 
            const users = await response.json();
            console.log('Usuarios cargados:', users);  
            return users;
        } catch (error) {
            console.error('Error al cargar el archivo login.json:', error);
            return [];
        }
    }

    function limpiarDatos() {
        document.getElementById('username').value = "";  // Limpiar el campo de usuario
        document.getElementById('password').value = "";  // Limpiar el campo de contraseña
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Evita la recarga de la página
        const username = document.getElementById('username').value.trim();  // Eliminar espacios en blanco
        const password = document.getElementById('password').value.trim();  // Eliminar espacios en blanco

        console.log('Usuario ingresado:', username);  // Mostrar el nombre de usuario ingresado
        console.log('Contraseña ingresada:', password);  // Mostrar la contraseña ingresada
        
        const users = await fetchUsers(); // Obtener los usuarios desde el archivo JSON
        let userFound = null;

        // Buscar el usuario
        for (let i = 0; i < users.length; i++) {
            console.log(`Comparando usuario: "${users[i].usuario}" con "${username}"`); // Mostrar comparación de usuario
            console.log(`Comparando contraseña: "${users[i].password}" con "${password}"`); // Mostrar comparación de contraseña

            if (users[i].usuario === username && users[i].password === password) {
                userFound = users[i];
                break;
            }
        }

        // Si se encuentra el usuario, guardar en localStorage y redirigir
        if (userFound) {
            localStorage.setItem('loggedInUser', JSON.stringify(userFound)); // Guardar el usuario autenticado
            switch (userFound.role) {
                case 'admin':
                    window.location.href = 'HTML/bienvenidaEmp.html';
                    break;
                case 'user':
                    window.location.href = 'html/principalc.html';
                    break;
                default:
                    alert('Rol no reconocido');
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }

        limpiarDatos();  // Limpiar los campos después de intentar iniciar sesión
    });
});
