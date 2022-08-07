$(document).ready(function () {
    let login_sucess = localStorage.getItem('login_sucess');
    if (login_sucess === false || login_sucess === null) {
        let data_login = {
            correo: 'reylis@gmail.com',
            clave: '12345',
        };

        localStorage.setItem('data_login', JSON.stringify(data_login));
        localStorage.setItem('login_sucess', false);
    } else if (login_sucess == 'true') {
        $('#btnCerrarSesion').css({ display: 'block' });
        load_form();
    }

});

$('#btnIniciarSesion').click(function () {
    let correo_login = $('#correo_login').val();
    let clave_login = $('#clave_login').val();

    let data_login = localStorage.getItem('data_login');
    data_login = JSON.parse(data_login);

    if (correo_login != data_login.correo) {
        $('#correo_error').css({ display: 'block' })
    }

    if (clave_login != data_login.clave) {
        $('#clave_error').css({ display: 'block' })
    }

    $('#correo_login').keyup(function () {
        $('#correo_error').css({ display: 'none' })
    });

    $('#clave_login').keyup(function () {
        $('#clave_error').css({ display: 'none' })
    });

    if (correo_login == data_login.correo && clave_login == data_login.clave) {
        localStorage.setItem('login_sucess', true);
        $('#btnCerrarSesion').css({ display: 'block' });
        $('#correo_login').val('');
        $('#clave_login').val('');
        load_form();
    }
});

function cerrar_sesion() {
    localStorage.setItem('login_sucess', false);
    
    $('#btnCerrarSesion').css({ display: 'none' });
    $('#login-container').css({ display: 'block' });
    $('#form-container').css({ display: 'none' });
}