import React from "react";
import { FaHome, FaBox, FaUser, FaListUl } from "react-icons/fa";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { BsPlusCircle, BsFillPencilFill, BsSearch } from "react-icons/bs";
import { TbTruckDelivery, TbCategoryFilled } from "react-icons/tb";
import { CgPlayButtonO } from "react-icons/cg";

export const SideBarData = [
  {
    title: "Productos",
    icon: <FaBox size={"1.2em"} />,
    link: "/",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/product/create",
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/",
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/",
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/",
      },
    ],
  },
  {
    title: "Proveedores",
    icon: <TbTruckDelivery size={"1.6em"} />,
    link: "/supplier/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/supplier/create",
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/supplier/search",
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/supplier/search",
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/supplier/search",
      },
    ],
  },
  {
    title: "Categorías",
    icon: <TbCategoryFilled size={"1.6em"} />,
    link: "/category/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/category/create",
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/category/search",
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/category/search",
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/category/search",
      },
    ],
  },
  {
    title: "Users",
    icon: <FaUser size={"1.4em"} />,
    link: "/user/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/user/create",
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/user/search",
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/user/search",
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/user/search",
      },
    ],
  },
  {
    title: "Listas de control de stock",
    icon: <FaListUl size={"1.4em"} />,
    link: "/listaControlStock/search",
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Crear",
        icon: <BsPlusCircle size={"1.3em"} />,
        link: "/listaControlStock/create",
      },
      {
        title: "Buscar",
        icon: <BsSearch size={"1.3em"} />,
        link: "/listaControlStock/search",
      },
      {
        title: "Actualizar",
        icon: <BsFillPencilFill size={"1.3em"} />,
        link: "/listaControlStock/search",
      },
      {
        title: "Eliminar",
        icon: <RiDeleteBin6Fill size={"1.3em"} />,
        link: "/listaControlStock/search",
      },
      {
        title: "Activar",
        icon: <CgPlayButtonO size={"1.3em"} />,
        link: "/listaControlStock/search",
      },
    ],
  },
];
