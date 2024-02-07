import Swal from 'sweetalert2';

export const messageExit = () => {
  Swal.fire({
    text: 'Registro Guardado con Exito!',
    icon: 'success'
  });
};

export const messageFail = () => {
  Swal.fire({
    text: 'Los datos ingresados no son validos por favor revise',
    icon: 'error'
  });
};
