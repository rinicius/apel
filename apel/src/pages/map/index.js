import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import "./styles.css";

// Conectar os markers no banco de dados

const positions = [
  {
    descricao: "ETEC",
    pos: [-22.872221, -47.21063],
  },

  {
    descricao: "Terminal",
    pos: [-22.874712, -47.207163],
  },
];

function Mapa() {
  const map = (
    <Map className="mapa" center={positions[0].pos} zoom={17}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {positions.map((values) => {
        return (
          <Marker position={values.pos}>
            <Popup>{values.descricao}</Popup>
          </Marker>
        );
      })}
    </Map>
  );

  return map;
}
export default Mapa;
