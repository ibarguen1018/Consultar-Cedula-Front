// src/SearchPerson.js
import React, { useState } from "react";
import axios from "axios";
import "./SearchPerson.css"; 

function SearchPerson() {
  const [cedula, setCedula] = useState("");
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState("");

  const buscarPersona = async () => {
    setError("");
    setPersona(null);

    try {
      const response = await axios.get(
        `https://consultar-cedula-back.onrender.com/buscar?cedula=${cedula}`
      );
      setPersona(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Error de conexión");
      }
    }
  };

  return (
    <div className="container-background">
      {/* Logo en la esquina superior izquierda */}
      <div className="logo">
        <a href="#">
          <img
            src="https://i.ibb.co/rXZpG6f/IUD.png"
            alt="IUD"
          />
        </a>
      </div>

      {/* Tarjeta principal */}
      <div className="card">
        <h1>🔎 Consulta de Cédula</h1>
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Ingrese la cédula"
        />
        <button onClick={buscarPersona}>🚀 Consultar</button>
        <div id="resultado" className="result">
          {error && <p className="error">{error}</p>}
          {persona && (
            <div>
              <p>
                <strong>Nombre:</strong> {persona.nombre} {persona.apellido}
              </p>
              <p>
                <strong>Género:</strong> {persona.genero}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong> {persona.Fecha_Nacimiento}
              </p>
              <p>
                <strong>Cargo:</strong> {persona.cargo}
              </p>
              <p>
                <strong>Edad:</strong> {persona.edad}
              </p>
              <img
                src={persona.foto}
                alt={`Foto de ${persona.nombre}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPerson;
