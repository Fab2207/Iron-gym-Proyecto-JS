import React, { useState, useEffect } from 'react';
import type { DatosCreacionCliente, DatosActualizacionCliente } from '../../types';
import type { Cliente } from '../../types/Cliente';
import type { Membresia } from '../../types/Membresia';

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

    const [fechaRegistro, setFechaRegistro] = useState(clienteExistente?.fechaRegistro || new Date().toISOString().slice(0, 10));

    useEffect(() => {
        if (clienteExistente) {
            setNombreCompleto(clienteExistente.nombreCompleto);
            setEmail(clienteExistente.email);
            setIdMembresia(clienteExistente.idMembresia);
            setTelefono(clienteExistente.telefono || '');
            setFechaNacimiento(clienteExistente.fechaNacimiento || '');
            setFechaRegistro(clienteExistente.fechaRegistro);
        } else {
            setNombreCompleto('');
            setEmail('');
            setIdMembresia('');
            setTelefono('');
            setFechaNacimiento('');
            setFechaRegistro(new Date().toISOString().slice(0, 10));
        }
    }, [clienteExistente]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (clienteExistente) {
            const datosActualizacion: DatosActualizacionCliente = {
                nombreCompleto,
                email,
                idMembresia,
                telefono,
                fechaNacimiento,

            };
            onGuardar(datosActualizacion);
        } else {
            const datosCreacion: DatosCreacionCliente = {
                nombreCompleto,
                email,
                idMembresia,
                telefono,
                fechaNacimiento,
                fechaRegistro,
            };
            onGuardar(datosCreacion);
        }
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
            { }
            {!clienteExistente && (
                <div>
                    <label htmlFor="fechaRegistro">Fecha de Registro:</label>
                    <input type="date" id="fechaRegistro" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} required />
                </div>
            )}
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
};

export default FormularioCliente;