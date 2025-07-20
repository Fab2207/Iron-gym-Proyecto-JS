
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="py-5">
            <h1 className="text-center text-primary fw-bold mb-5">Sobre Nosotros</h1>
            <div className="row g-4 align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://placehold.co/600x400/D8BFD8/000000?text=Equipo+del+Gimnasio"
                        alt="[Image of Gym Team]"
                        className="img-fluid rounded-4 shadow-sm"
                    />
                </div>
                <div className="col-md-6">
                    <p className="lead text-muted">
                        En GymApp, nos apasiona la salud y el bienestar. Hemos creado una herramienta intuitiva y potente
                        para que los gimnasios puedan gestionar sus operaciones diarias de manera eficiente,
                        desde la administración de miembros hasta el seguimiento de asistencias y pagos.
                    </p>
                    <p className="text-muted">
                        Nuestro equipo está compuesto por tres estudiantes universitarios dedicados,
                        comprometidos con la creación de soluciones innovadoras que faciliten la vida
                        de los administradores y recepcionistas de gimnasios, y mejoren la experiencia
                        de los clientes.
                    </p>
                    <ul className="list-unstyled mt-4 text-dark">
                        <li><i className="bi bi-check-circle-fill text-success me-2"></i> Gestión de Miembros Simplificada</li>
                        <li><i className="bi bi-check-circle-fill text-success me-2"></i> Control de Asistencia Rápido</li>
                        <li><i className="bi bi-check-circle-fill text-success me-2"></i> Reportes y Estadísticas Detalladas</li>
                        <li><i className="bi bi-check-circle-fill text-success me-2"></i> Interfaz de Usuario Intuitiva</li>
                    </ul>
                </div>
            </div>
            <div className="mt-5 text-center">
                <h3 className="text-dark fw-bold mb-4">Nuestra Misión</h3>
                <p className="text-muted lead">
                    Empoderar a los gimnasios con tecnología avanzada para optimizar su gestión,
                    permitiéndoles enfocarse en lo que realmente importa: la salud y el progreso de sus clientes.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
