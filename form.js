$(document).ready(function () {
    load_usuarios();
})

function load_form() {
    $('#login-container').css({ display: 'none' });
    $('#form-container').css({ display: 'block' });
}

function limpiar() {
    $('#nombre_form').val('');
    $('#apellido_form').val('');
    $('#correo_form').val('');
    $('#telefono_form').val('');
}

function guardar() {
    let nombre_form = $('#nombre_form').val();
    let apellido_form = $('#apellido_form').val();
    let correo_form = $('#correo_form').val();
    let telefono_form = $('#telefono_form').val();

    let usuarios = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuarios);

    let data = {
        nombre: nombre_form,
        apellido: apellido_form,
        correo: correo_form,
        telefono: telefono_form
    }

    usuarios.push(data);
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    $('#nombre_form').val('');
    $('#apellido_form').val('');
    $('#correo_form').val('');
    $('#telefono_form').val('');
    load_usuarios();
}

function load_usuarios() {
    let tbody = $('#table>tbody');
    tbody.html('')
    let usuarios = localStorage.getItem('usuarios');
    if (usuarios != null) {
        usuarios = JSON.parse(usuarios);
        for (let i = 0; i < usuarios.length; i++) {
            tbody.append(
                `
                <tr>
                    <td>${i + 1}</td>
                    <td>${usuarios[i].nombre}</td>
                    <td>${usuarios[i].apellido}</td>
                    <td>${usuarios[i].correo}</td>
                    <td>${usuarios[i].telefono}</td>
                    <td>
                        <button class="btn btn-warning text-white" data-id="${i}" id="btnEditar">Editar</button>
                        <button class="btn btn-danger" data-id="${i}" id="btnEliminar">Eliminar</button>
                    </td>
                </tr>
                `
            );
        }
    } else {
        localStorage.setItem('usuarios', JSON.stringify([]))
    }

    $('button#btnEditar').click(function () {
        editar_get($(this).data());
    })

    $('button#btnEliminar').click(function () {
        eliminar($(this).data());
    })
}

function editar_get(number) {
    let usuarios = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuarios);
    let usuario = usuarios[number.id];
    $('#nombre_form').val(usuario.nombre);
    $('#apellido_form').val(usuario.apellido);
    $('#correo_form').val(usuario.correo);
    $('#telefono_form').val(usuario.telefono);
    $('#btnFormEditar').css({ display: 'block' });
    $('#btnFormGuardar').css({ display: 'none' });
    $('#form_selector').append(
        `
        <input type='text' class='form-control' style='display: none' id='number' value='${number.id}'/>
        `
    )
}

function editar_guardar() {
    let nombre_form = $('#nombre_form').val();
    let apellido_form = $('#apellido_form').val();
    let correo_form = $('#correo_form').val();
    let telefono_form = $('#telefono_form').val();
    let number = $('#number').val();

    let usuarios = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuarios);

    let data = {
        nombre: nombre_form,
        apellido: apellido_form,
        correo: correo_form,
        telefono: telefono_form
    }

    usuarios[number] = data;
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    $('#nombre_form').val('');
    $('#apellido_form').val('');
    $('#correo_form').val('');
    $('#telefono_form').val('');
    $('#btnFormEditar').css({ display: 'none' });
    $('#btnFormGuardar').css({ display: 'block' });
    $("#number").remove();
    load_usuarios();
}

function eliminar(number) {
    let usuarios = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuarios);
    usuarios.splice(number.id, 1)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    load_usuarios();
}

$('#btnBuscar').click(function () {
    buscar();
});

$('#buscarForm').keyup(function () {
    buscar();
});

function buscar() {
    let tbody = $('#table>tbody');
    let text = $('#buscarForm').val();
    if (text != '') {
        let usuarios = localStorage.getItem('usuarios');
        usuarios = JSON.parse(usuarios);

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].nombre.toLowerCase() == text) {
                tbody.html('');
                tbody.append(
                    `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${usuarios[i].nombre}</td>
                        <td>${usuarios[i].apellido}</td>
                        <td>${usuarios[i].correo}</td>
                        <td>${usuarios[i].telefono}</td>
                        <td>
                            <button class="btn btn-warning text-white" data-id="${i}" id="btnEditar">Editar</button>
                            <button class="btn btn-danger" data-id="${i}" id="btnEliminar">Eliminar</button>
                        </td>
                    </tr>
                    `
                );
                break;
            } else {
                tbody.html('');
                tbody.append(
                    `
                    <tr>
                        <td class='text-center' colspan="6">No se encontro resultados</td>
                    </tr>
                    `
                );
            }
        }

    } else {
        load_usuarios();
    }
}