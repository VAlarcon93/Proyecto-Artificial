import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaRegEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Aside } from "../../Componentes/Aside";
import { Link } from "react-router-dom";
import { Paginacion } from "../../Componentes/Paginacion";
import Swal from "sweetalert2";
import axios from "axios";
import '../../../assets/styles/proyecto.css'

export const Tabla= () => {
  useEffect(() => {
    document.title = "Proyectos";
  }, []);

  /* Modals */
  const [showModal, setShowModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModalver, setShowModalver] = React.useState(false);

  //Paginación
  const [dataPage, setDataPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [tablaData, setTablaData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const sigIndex = currentPage * dataPage;
  const primerIndex = sigIndex - dataPage;

  //Llamar API
  const [datosServidor, setDatosServidor] = useState([]);
  const totalData = datosServidor.length;
  console.log("Listar datos", datosServidor);

  async function getInfo() {
    const url = "http://127.0.0.1:8000/empleados/empleados"; //AQUI METE LA URL

    let config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const resp = await axios.get(url, config);
      setDatosServidor(resp.data);
      setTablaData(resp.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);

  //Busqueda

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = terminoBusqueda => {
    var resultadosBusqueda = tablaData.filter(elemento => {
      if (
        elemento.nombres
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.id_departamento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setDatosServidor(resultadosBusqueda);
  };

  //eliminar
  const eliminarEmpleado = async id => {
    try {
      const url = `http://127.0.0.1:8000/empleados/empleados/${id}`;
      await axios.delete(url);
      getInfo();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Ocurrió un error al eliminar proyecto", "error");
    }
  };
  const FuncionEliminar = id => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
    }).then(result => {
      if (result.isConfirmed) {
        eliminarEmpleado(id);
        Swal.fire("Eliminado", "El proyecto ha sido removido", "success");
      }
    });
  };

  return (
    <div className="flex">
      <Aside />
      <div className="ml-24 mb-8  w-full h-full mr-5">
        <div className="flex">
          <section className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg pb-8">
            <div className="flex justify-between pt-24">
              <div></div>
              <h1 className="text-center text-3xl text-black title-proyectos">PROYECTOS</h1>
              <div className="">
                <div className="flex items-center md:justify-end px-5 m-2">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <button
                      className="btn btn-agregar rounded-full"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      <span className="text-Negro text-4xl">
                        <FaPlusCircle />
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
            {/* Empieza el modal */}
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className=" text-black flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="title text-black">Agregar Proyecto</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div>
                          <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                              {/*Nombre proyecto */}
                              <div className="mb-5">
                                <label
                                  htmlFor="nproyecto"
                                  className="mb-3 block text-base font-medium text-[#263562]"
                                >
                                  Nombre proyecto
                                </label>
                                <input
                                  type="text"
                                  name="nombre_proyecto"
                                  id="nombre_proyecto"
                                  placeholder="Nombre proyecto"
                                  className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                />
                              </div>
                            </div>
                            {/*N° expediente */}
                            <div className="w-full px-3 sm:w-1/2">
                              <div className="mb-5">
                                <label
                                  htmlFor="expediente"
                                  className="mb-3 block text-base font-medium text-[#263562]"
                                >
                                  N° Expediente
                                </label>
                                <input
                                  type="text"
                                  name="expediente"
                                  id="expediente"
                                  placeholder="N° Expediente"
                                  className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                />
                              </div>
                            </div>
                          </div>
                          {/*Descripción */}
                          <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                              <div className="mb-5">
                                <label
                                  htmlFor="date"
                                  className="mb-3 block text-base font-medium text-[#263562]"
                                >
                                  Descripción
                                </label>
                                <input
                                  type="text"
                                  name="descripcion"
                                  id="descripcion"
                                  placeholder="Descripción"
                                  className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="mt-4 p-3 btn-cancel rounded-[10px] border"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          className="mt-4 p-3 btn-register rounded-[10px] border"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Registrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
            {/*Termina el modal*/}
            <div className="mx-5">
              <div className="flex items-center md:justify-end pb-3 m-2">
                <label htmlFor="table-search" className="sr-only">
                  Buscar
                </label>
                <div className="relative md:content-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="icon1 w-5 h-5 text-black dark:text-black"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="icon1"
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    className="mt-5 rounded-[10px] border p-3 w-80 focus:outline-none border-[#E2231A]"
                    placeholder="        Ingrese nombre o id de expediente"
                    value={busqueda}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-black  dark:text-gray-400 ">
                  <thead className="text-xs text-black uppercase text-center bg-col2">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-Font2">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-Font2">
                        Expediente
                      </th>
                      <th scope="col" className="px-6 py-3 text-Font2">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3 text-Font2">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="bg-gray-100 border-black  text-black text-center hover:bg-gray-200 hover:text-dark">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                      >
                        <div className="pl-3 text-start">
                          <div className="text-base font-semibold text-black text-Font3">
                            2545242
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-Font3">24242</td>
                      <td className="px-6 py-4 text-Font3">4242</td>
                      <td className="px-6 py-8 text-center flex justify-evenly content-center">
                        <Link to={`#`} className="font-medium  hover:underline">
                          <button className="btn btn-ver"
                          onClick={() => setShowModalver(true)}>
                            <span className=" text-azul-ver text-2xl">
                              <FaRegEye />
                            </span>
                          </button>
                            {/* Empieza el modal */}
                            {showModalver ? (
                            <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                      <h3 className="title">Información del Proyecto</h3>
                                      <button
                                        className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalver(false)}
                                      >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                      </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                      <div>
                                        <div className="-mx-3 flex flex-wrap">
                                          <div className="w-full px-3 sm:w-1/2">
                                            {/*Nombre proyecto */}
                                            <div className="mb-5">
                                              <label
                                                htmlFor="nproyecto"
                                                className="mb-3 block text-base font-medium text-[#263562] text-font2"
                                              >
                                                Nombre proyecto
                                              </label>
                                              <input
                                                type="text"
                                                name="nombre_proyecto"
                                                id="nombre_proyecto"
                                                disabled
                                                className="w-full rounded-xl border border-white bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md text-font2"
                                              />
                                            </div>
                                          </div>
                                          {/*N° expediente */}
                                          <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                              <label
                                                htmlFor="expediente"
                                                className="mb-3 block text-base font-medium text-[#263562] text-font2"
                                              >
                                                N° Expediente
                                              </label>
                                              <input
                                                type="text"
                                                name="expediente"
                                                id="expediente"
                                                disabled
                                                className="w-full rounded-xl border border-white bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        {/*Descripción */}
                                        <div className="-mx-3 flex flex-wrap">
                                          <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                              <label
                                                htmlFor="date"
                                                className="mb-3 block text-base font-medium text-[#263562] text-font2"
                                              >
                                                Descripción
                                              </label>
                                              <input
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                disabled
                                                className="w-full rounded-xl border border-white bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                      <button
                                        className="mt-4 p-3 btn-register rounded-[10px] border text-font2"
                                        type="button"
                                        onClick={() => setShowModalver(false)}
                                      >
                                        Aceptar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                          ) : null}
                          {/*Termina el modal*/}
                        </Link>
                        <Link to={`#`} className="font-medium hover:underline">
                          <button
                            className="btn btn-editar"
                            onClick={() => setShowModal1(true)}
                          >
                            <span className="text-yellow-500 text-2xl">
                              <FaRegEdit />
                            </span>
                          </button>
                          {/* Empieza el modal */}
                          {showModal1 ? (
                            <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                      <h3 className="title">Editar Proyecto</h3>
                                      <button
                                        className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal1(false)}
                                      >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                      </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                      <div>
                                        <div className="-mx-3 flex flex-wrap">
                                          <div className="w-full px-3 sm:w-1/2">
                                            {/*Nombre proyecto */}
                                            <div className="mb-5">
                                              <label
                                                htmlFor="nproyecto"
                                                className="mb-3 block text-base font-medium text-[#263562]"
                                              >
                                                Nombre proyecto
                                              </label>
                                              <input
                                                type="text"
                                                name="nombre_proyecto"
                                                id="nombre_proyecto"
                                                placeholder="Nombre proyecto"
                                                className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                              />
                                            </div>
                                          </div>
                                          {/*N° expediente */}
                                          <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                              <label
                                                htmlFor="expediente"
                                                className="mb-3 block text-base font-medium text-[#263562]"
                                              >
                                                N° Expediente
                                              </label>
                                              <input
                                                type="text"
                                                name="expediente"
                                                id="expediente"
                                                placeholder="N° Expediente"
                                                className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        {/*Descripción */}
                                        <div className="-mx-3 flex flex-wrap">
                                          <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                              <label
                                                htmlFor="date"
                                                className="mb-3 block text-base font-medium text-[#263562]"
                                              >
                                                Descripción
                                              </label>
                                              <input
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                placeholder="Descripción"
                                                className="w-full rounded-xl border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#263562] focus:shadow-md"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                      <button
                                        className="mt-4 p-3 btn-cancel rounded-[10px] border"
                                        type="button"
                                        onClick={() => setShowModal1(false)}
                                      >
                                        Cancelar
                                      </button>
                                      <button
                                        className="mt-4 p-3 btn-register rounded-[10px] border"
                                        type="button"
                                        onClick={() => setShowModal1(false)}
                                      >
                                        Actualizar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                          ) : null}
                          {/*Termina el modal*/}
                        </Link>
                        <button
                          className="btn btn-eliminar "
                          onClick={() => FuncionEliminar(2)}
                        >
                          <span className="text-red-500 text-xl">
                            <FaTrashAlt />
                          </span>
                        </button>
                      </td>
                    </tr>
                    {datosServidor &&
                      datosServidor
                        .map(empl => {
                          return (
                            <tr className="bg-gray-100 border-black  text-black text-center hover:bg-gray-200 hover:text-dark">
                              <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                              >
                                <div className="pl-3 text-start">
                                  <div className="text-base font-semibold text-black">
                                    {empl.nombres} {empl.apellidos}
                                  </div>
                                  <div className="font-normal text-gray-500">
                                    {empl.correo}
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-4">
                                {empl.documento_identidad}
                              </td>
                              <td className="px-6 py-4">
                                {empl.id_departamento}
                              </td>
                              <td className="px-6 py-4">{empl.cargo}</td>
                              <td className="px-6 py-8 text-center flex justify-evenly content-center">
                                <Link
                                  to={`/ver-empleado/${empl.id}`}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  <button className="btn btn-ver">
                                    <span className="text-azul-ver text-2xl">
                                      <FaRegEye />
                                    </span>
                                  </button>
                                </Link>
                                <Link
                                  to={`/editar-empleado/${empl.id}`}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  <button className="btn btn-editar ">
                                    <span className="text-amarillo-editar text-2xl">
                                      <FaRegEdit />
                                    </span>
                                  </button>
                                </Link>
                                <button
                                  className="btn btn-eliminar "
                                  onClick={() => FuncionEliminar(empl.id)}
                                >
                                  <span className="text-rojo-eliminar text-xl">
                                    <FaTrashAlt />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                        .slice(primerIndex, sigIndex)}
                  </tbody>
                </table>
              </div>
              <Paginacion
                dataPage={dataPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalData={totalData}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
