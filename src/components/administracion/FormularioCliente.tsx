import React, { useState, useEffect } from 'react';
import type { DatosCreacionCliente, DatosActualizacionCliente } from '../../types';
import type{ Cliente } from '../../types/Cliente';
import type{ Membresia } from '../../types/Membresia';
import { registrarCliente, actualizarCliente } from '../../services/api';

interface FormularioClienteProps {
  clienteExistente?: Cliente;
  onGuardar: (datos: DatosCreacionCliente | DatosActualizacionCliente) => void;
  onCancelar: () => void;
  membresias: Membresia[];
}

const FormularioCliente: React.FC<FormularioClienteProps> = ({ clienteExistente, onGuardar, onCancelar, membresias }) => {
  const [nombreCompleto, setNombreCompleto] = useState(clienteExistente?.nombreCompleto || '');
  const [email, setEmail] = useState(clienteExistente?.email || '');
  const [idMembresia, setIdMembresia] = useState(clienteExistente?.idMembresia || '');
  const [telefono, setTelefono] = useState(clienteExistente?.telefono || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(clienteExistente?.fechaNacimiento || '');

  useEffect(() => {
    if (clienteExistente) {
      setNombreCompleto(clienteExistente.nombreCompleto);
      setEmail(clienteExistente.email);
      setIdMembresia(clienteExistente.idMembresia);
      setTelefono(clienteExistente.telefono || '');
      setFechaNacimiento(clienteExistente.fechaNacimiento || '');
    } else {
        setNombreCompleto('');
        setEmail('');
        setIdMembresia('');
        setTelefono('');
        setFechaNacimiento('');
    }
  }, [clienteExistente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (clienteExistente) {
      // Actualizar cliente existente
      const datosActualizacion: DatosActualizacionCliente = {
        nombreCompleto,
        email,
        idMembresia,
        telefono,
        fechaNacimiento,
      };
      
      actualizarCliente(clienteExistente.id, datosActualizacion)
        .then(() => {
          alert('Cliente actualizado exitosamente');
          onGuardar(datosActualizacion);
        })
        .catch((error) => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar cliente');
        });
    } else {
      // Crear nuevo cliente
      const datosCreacion: DatosCreacionCliente = {
        nombreCompleto,
        email,
        idMembresia,
        telefono,
        fechaNacimiento,
      };
      
      registrarCliente(datosCreacion)
        .then(() => {
          alert('Cliente creado exitosamente');
          onGuardar(datosCreacion);
        })
        .catch((error) => {
          console.error('Error al crear cliente:', error);
          alert('Error al crear cliente');
        });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {clienteExistente ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreCompleto" className="form-label">Nombre Completo:</label>
            <input 
              type="text" 
              className="form-control"
              id="nombreCompleto" 
              value={nombreCompleto} 
              onChange={(e) => setNombreCompleto(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              className="form-control"
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="membresia" className="form-label">Membresía:</label>
            <select 
              className="form-control"
              id="membresia" 
              value={idMembresia} 
              onChange={(e) => setIdMembresia(e.target.value)} 
              required
            >
              <option value="">Seleccione una membresía</option>
              {membresias.map((mem) => (
                <option key={mem.id} value={mem.id}>
                  {mem.nombre} (${mem.precio})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono:</label>
            <input 
              type="tel" 
              className="form-control"
              id="telefono" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
            <input 
              type="date" 
              className="form-control"
              id="fechaNacimiento" 
              value={fechaNacimiento} 
              onChange={(e) => setFechaNacimiento(e.target.value)} 
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCliente;
      nombreCompleto,
      email,
      idMembresia,
      telefono,
      fechaNacimiento,
    };
    onGuardar(datos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{clienteExistente ? 'Editar Cliente' : 'Crear Nuevo Cliente'}</h2>
      <div>
        <label htmlFor="nombreCompleto">Nombre Completo:</label>
        <input type="text" id="nombreCompleto" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="membresia">Membresía:</label>
        <select id="membresia" value={idMembresia} onChange={(e) => setIdMembresia(e.target.value)} required>
          <option value="">Seleccione una membresía</option>
          {membresias.map((mem) => (
            <option key={mem.id} value={mem.id}>
              {mem.nombre} ({mem.precio} $)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>
      <div>
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
};

export default FormularioCliente;