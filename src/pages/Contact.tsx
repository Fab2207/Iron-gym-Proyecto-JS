
import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="py-5">
            <h1 className="text-center text-primary fw-bold mb-5">Contáctanos</h1>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg p-4 rounded-4 border-0">
                        <div className="card-body">
                            <p className="text-muted text-center mb-4">
                                ¿Tienes alguna pregunta o necesitas ayuda? Rellena el formulario o contáctanos directamente.
                            </p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Nombre Completo</label>
                                    <input type="text" className="form-control rounded-3 p-2" id="name" placeholder="Tu Nombre" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
                                    <input type="email" className="form-control rounded-3 p-2" id="email" placeholder="tu@email.com" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label fw-semibold">Mensaje</label>
                                    <textarea className="form-control rounded-3 p-2" id="message" rows={5} placeholder="Escribe tu mensaje aquí..." required></textarea>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary py-2 rounded-3 fw-bold">
                                        Enviar Mensaje <i className="bi bi-send-fill ms-2"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <h3 className="text-dark fw-bold mb-4">Nuestra Ubicación</h3>
                <p className="text-muted lead">
                    Visítanos en nuestras oficinas:
                    <br />
                    Av. Siempre Viva 742, Primavera, Lima, Perú
                </p>
                {/* Placeholder para mapa */}
                <div className="bg-light p-4 rounded-4 shadow-sm mt-4" style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p className="text-muted">Aquí iría un mapa (ej. Google Maps Embed)</p>
                </div>
            </div>
            <div className="text-center mt-5">
                <h3 className="text-dark fw-bold mb-4">Síguenos en redes</h3>
                <div className="d-flex justify-content-center gap-3 fs-3">
                    <a href="#" className="text-primary"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="text-info"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="text-danger"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="text-success"><i className="bi bi-whatsapp"></i></a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
