import React from "react";
import { FaBox, FaUser, FaListUl, FaRegFileExcel } from "react-icons/fa";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { BsPlusCircle, BsFillPencilFill, BsSearch } from "react-icons/bs";
import { TbTruckDelivery, TbCategoryFilled } from "react-icons/tb";
import { CgPlayButtonO } from "react-icons/cg";
import { CgPlayListRemove } from "react-icons/cg";
import { BsDatabaseFillDown } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";

export const SideBarData = [
  {
    title: "Productos",
    icon: <FaBox size={"1.2em"} />,
    link: "/",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/product/create",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/",
        roles: ["Administrador"],
      },
    ],
  },
  {
    title: "Proveedores",
    icon: <TbTruckDelivery size={"1.6em"} />,
    link: "/supplier/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/supplier/create",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/supplier/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/supplier/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/supplier/search",
        roles: ["Administrador"],
      },
    ],
  },
  {
    title: "Categorías",
    icon: <TbCategoryFilled size={"1.6em"} />,
    link: "/category/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/category/create",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/category/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/category/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/category/search",
        roles: ["Administrador"],
      },
    ],
  },
  {
    title: "Users",
    icon: <FaUser size={"1.4em"} />,
    link: "/user/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/user/create",
        roles: ["Administrador"],
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/user/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/user/search",
        roles: ["Administrador"],
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/user/search",
        roles: ["Administrador"],
      },
    ],
  },
  {
    title: "Listas de control de stock",
    icon: <FaListUl size={"1.4em"} />,
    link: "/listaControlStock/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/listControlStock/create",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/listControlStock/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/listControlStock/search",
        roles: ["Administrador", "Empleado"],
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/listControlStock/search",
        roles: ["Administrador"],
      },
      {
        title: "Activar",
        icon: <CgPlayButtonO size={"1.3em"} />,
        link: "/listControlStock/search",
        roles: ["Administrador", "Empleado"],
      },
    ],
  },
  {
    title: "Lista de productos con stock negativo",
    icon: <CgPlayListRemove size={"2.4em"} />,
    link: "/listaNegativeStock/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Generar lista",
        icon: <CgPlayButtonO size={"1.3em"} />,
        link: "/listNegativeStock/generate",
        roles: ["Administrador", "Empleado"],
      },
    ],
  },
  {
    title: "Cargar data",
    icon: <BsDatabaseFillDown size={"2em"} />,
    link: "/dataIntegration/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Cargar archivo Excel",
        icon: <FaRegFileExcel size={"1.3em"} />,
        link: "/dataIntegration/load",
        roles: ["Administrador", "Empleado"],
      },
    ],
  },
  {
    title: "Logout",
    icon: <GrLogout size={"2em"} />,
    link: "/login",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    roles: ["Administrador", "Empleado"],
    subNav: [
      {
        title: "Logout",
        icon: <GrLogout size={"1.3em"} />,
        roles: ["Administrador", "Empleado"],
      },
    ],
  },
];
