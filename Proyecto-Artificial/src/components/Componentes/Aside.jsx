import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaHome, FaPaste, FaUserAltSlash,FaFile, FaImages, FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/img/favicon.png"
import logoComp from "../../assets/img/logo-artificial-blanco.svg"


export const Aside = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);

  return (
    <nav className="fixed z-20 ">
      <div
        className={` bg-Azul h-screen p-5 pt-8 rounded-tr-xl rounded-br-xl ${
          open ? "w-60" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-14 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex ">
          <img src={logo} width={30}
            className={`text-white text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            } ${open && "scale-0"}`}
          />
          <img src={logoComp}  width={160}
            className={`text-white text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              !open && "scale-0"
            }`}
          />
        </div>
        <ul className="pt-2">
          {/*Inicio */}
          <Link to="/inicio"><li
            className={`text-white text-md flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md mt-3
                }`}
          >
            <span className="text-xl block float-left">
              <FaHome />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Inicio
            </span>
          </li></Link>

          {/*Proyectos */}
          <Link to="/proyectos"><li
            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md  mt-3
                }`}
          >
            <span className="text-xl block float-left">
              < FaFolder />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Proyectos
            </span>
          </li></Link>
          {/*Expedientes */}
          <Link to="/expediente"><li
            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md  mt-3
                }`}
          >
            <span className="text-xl block float-left">
              < FaFile />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Colecciones
            </span>
          </li></Link>

          {/*Imagenes */}
          <Link to="/imagenes"><li
            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md  mt-3
                }`}
          >
            <span className="text-xl block float-left">
              <FaImages />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Imágenes
            </span>
          </li></Link>
          {/*Reportes */}
          <Link to="#"><li
            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md  mt-3
                }`}
          >
            <span className="text-xl block float-left">
              <FaPaste />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Reportes
            </span>
          </li></Link>
          {/*Salir*/}
          <a href="/" className="absolute  bottom-0 pb-5"><li
            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 py-2 hover:bg-light-white rounded-md  mt-3
                }`}
          >
            <span className="text-xl block float-left">
              <FaUserAltSlash />
            </span>
            <span
              className={`text-xl font-medium flex-1 duration-200 ${
                !open && "hidden"
              }`}
            >
              Salir
            </span>
          </li></a>
        </ul>
      </div>
    </nav>
  );
};
