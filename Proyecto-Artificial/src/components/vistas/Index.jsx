import React from "react";
import "../../assets/styles/output.css";
import { useState, useEffect } from "react";
import Logo from '../../assets/img/logo-artificial-azul.svg'

function Index() {
  useEffect(() => {
    document.title = "Inicio de sesión";
  }, []);

  const datosFormulario = {
    Usuario: "",
    Contrasena: "",
  };

  const initialStateInput = {
    valorInput: "",
    mensaje: "",
    estado: false,
  };

  //Estado para manejar los valores del formulario
  const [formulario, setFormulario] = useState(datosFormulario);

  //Estado para manejar las alertas de validación
  const [alerta, setAlerta] = useState([initialStateInput]);

  //Función para obtener los datos de los inputs
  const ManejarEventoDeInputs = (e) => {
    //la propiedad target del event nos permitirá obtener los valores
    const name = e.target.name;
    const value = e.target.value;

    //actualizamos los valores capturados a nuestro estado de formulario
    setFormulario({ ...formulario, [name]: value });
  };

  const handleLoginSession = (e) => {
    e.preventDefault();

    let verificarInputs = [
      { nombre: "Usuario", value: formulario.Usuario },
      { nombre: "Contrasena", value: formulario.Contrasena },
    ];

    const datosValidados = ValidarInputs(verificarInputs);

    setAlerta(datosValidados);

    const totalValidaciones = datosValidados
      .filter((input) => input.estado === false)
      .map((estado) => {
        return false;
      });

    if (totalValidaciones.length >= 1) {
      console.log("Enviar datos al servidor");
    }
  };

  const ValidarInputs = (data) => {
    let errors = [];

    const datosDelFormulario = data;

    datosDelFormulario.map((valorInput) => {
      switch (valorInput.nombre) {
        case "Usuario": {
          if (valorInput.value === "" || valorInput.value === null) {
            errors.push({
              valorInput: valorInput.nombre,
              mensaje: "*Campo requerido",
              estado: true,
            });
          } else {
            errors.push({
              valorInput: valorInput.nombre,
              mensaje: "",
              estado: false,
            });
          }

          break;
        }

        case "Contrasena": {
          if (valorInput.value === "" || valorInput.value === null) {
            errors.push({
              valorInput: valorInput.nombre,
              mensaje: "*Campo requerido",
              estado: true,
            });
          } else {
            errors.push({
              valorInput: valorInput.nombre,
              mensaje: "",
              estado: false,
            });
          }
          break;
        }

        default: {
          break;
        }
      }
    });

    return errors;
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleLoginSession}>
          <div className="min-w-fit flex-col bg-white px-80 py-20 rounded-[10px] ">
            <div className="mb-8 flex justify-center">
              <img
                className="w-50"
                src={Logo}
                alt=""
              />
            </div>
            <div className="flex flex-col text-sm rounded-lg ">
              <input
                className="mt-5 rounded-[10px] border p-3 focus:outline-none border-[#E2231A]"
                type="text"
                placeholder="Usuario"
                name="Usuario"
                value={formulario.Usuario}
                onChange={ManejarEventoDeInputs}
              />
              {alerta
                .filter(
                  (input) =>
                    input.valorInput == "Usuario" && input.estado === true
                )
                .map((message) => (
                  <div>
                    <span className="text-red-600">{message.mensaje}</span>
                  </div>
                ))}
              <input
                className=" mt-5 rounded-[10px] border p-3 w-80 focus:outline-none border-[#E2231A]"
                type="password"
                placeholder="Contraseña"
                name="Contrasena"
                value={formulario.Contrasena}
                onChange={ManejarEventoDeInputs}
              />
              {alerta
                .filter(
                  (input) =>
                    input.valorInput == "Contrasena" && input.estado === true
                )
                .map((message) => (
                  <div>
                    <span className="text-red-600">{message.mensaje}</span>
                  </div>
                ))}
              <button
                className="mt-4 w-full  p-3  bg-[#263562] text-[#F4EFEF] rounded-[10px] border  hover:bg-[#E2231A] scale-90 duration-300"
                type="submit"
              >
                INICIAR SESIÓN{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;
