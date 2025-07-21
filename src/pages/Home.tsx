import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [planSeleccionado, setPlanSeleccionado] = useState<string>("");
    const navigate = useNavigate();

    const handleElegirPlan = (plan: string) => {
        setPlanSeleccionado(plan);
        setShowModal(true);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPlanSeleccionado("");
    };

    return (
        <div className="home-page">
            {/* HERO SECTION */}
            <section className="hero-section text-light text-center d-flex align-items-center justify-content-center">
                <div className="hero-content">
                    <h1>Bienvenido a IronGym</h1>
                    <p>Transforma tu cuerpo. Transforma tu vida.</p>
                    <p className="lead">Más que un gimnasio, somos una comunidad que te impulsa a ser tu mejor versión.</p>
                    <a href="#membresias" className="btn btn-warning btn-lg mt-3">Ver Membresías</a>
                </div>
            </section>

            {/* SOBRE NOSOTROS */}
            <section className="container py-5" id="nosotros">
                <h2 className="text-center mb-4">Sobre Nosotros</h2>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="lead">
                            En IronGym, ofrecemos un enfoque moderno y efectivo al fitness. Nuestro equipo está comprometido con tu transformación física y mental.
                        </p>
                        <p><strong>Misión:</strong> Inspirar una vida saludable mediante el entrenamiento y la comunidad.</p>
                        <p><strong>Visión:</strong> Ser el gimnasio de referencia donde cada miembro alcance su máximo potencial.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img
                            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Equipo de gimnasio"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </section>

            {/* UBICACIÓN */}
            <section className="bg-light py-5" id="ubicacion">
                <div className="container">
                    <h2 className="text-center mb-4">¿Dónde estamos?</h2>
                    <div className="d-flex justify-content-center">
                        <iframe
                            title="Mapa Gimnasio"
                            src="https://www.google.com/maps/embed?pb=!1m18..."
                            width="100%"
                            height="300"
                            style={{ border: 0, borderRadius: "8px", maxWidth: "800px" }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* INSTALACIONES */}
            <section className="container py-5" id="instalaciones">
                <h2 className="text-center mb-4">Nuestras Instalaciones</h2>
                <div className="row text-center">
                    {[
                        { img: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Área de Cardio", desc: "Máquinas modernas para mejorar tu resistencia y salud cardiovascular." },
                        { img: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Zona de Pesas", desc: "Equipamiento de fuerza completo para todos los niveles." },
                        { img: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Salón Grupal", desc: "Clases de yoga, funcional, spinning y más en un espacio amplio y equipado." }
                    ].map((item, idx) => (
                        <div className="col-md-4" key={idx}>
                            <img src={item.img} className="img-fluid rounded mb-3" alt={item.title} />
                            <h5>{item.title}</h5>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* MEMBRESÍAS */}
            <section className="container py-5" id="membresias">
                <h2 className="text-center mb-4">Nuestras Membresías</h2>
                <div className="row">
                    {[
                        {
                            tipo: 'Mensual',
                            precio: '$25',
                            desc: 'Acceso total por 30 días. Ideal para probar el gimnasio.',
                            extras: ['Acceso libre a todas las áreas', '1 clase grupal semanal', 'Evaluación inicial gratuita']
                        },
                        {
                            tipo: 'Trimestral',
                            precio: '$65',
                            desc: '3 meses con beneficios exclusivos y asesoramiento.',
                            extras: ['Acceso libre', '3 clases grupales/semana', 'Rutina personalizada', 'Evaluaciones mensuales']
                        },
                        {
                            tipo: 'Anual',
                            precio: '$199',
                            desc: 'Mejor relación calidad-precio. Incluye regalos exclusivos.',
                            extras: ['Acceso ilimitado', 'Clases ilimitadas', 'Entrenamiento personalizado', 'Kit IronGym']
                        }
                    ].map((plan, idx) => (
                        <div className="col-md-4 mb-4" key={idx}>
                            <div className={`card h-100 shadow membership-card ${plan.tipo === 'Trimestral' ? 'premium' : ''}`}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{plan.tipo}</h5>
                                    <p className="card-text">{plan.desc}</p>
                                    <h4 className="text-warning">{plan.precio}</h4>
                                    <ul className="text-start small mt-3 mb-3">
                                        {plan.extras.map((item, i) => (
                                            <li key={i}><i className="bi bi-check-circle-fill text-success me-2"></i>{item}</li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-outline-primary mt-2" onClick={() => handleElegirPlan(plan.tipo)}>
                                        Elegir plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* VIDEO PROMOCIONAL */}
            <section className="video-section py-5 bg-dark text-light">
                <div className="container text-center">
                    <h2 className="mb-4">Conoce nuestro ambiente</h2>
                    <div className="ratio ratio-16x9 mx-auto" style={{ maxWidth: "800px" }}>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/eAlNvWgTDZQ?si=_Q-adzd-9_lN_Z2f"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* SERVICIOS */}
            <section className="container py-5" id="servicios">
                <h2 className="text-center mb-4">Nuestros Servicios</h2>
                <div className="row text-center">
                    {[
                        {
                            icon: "bi-heart-pulse-fill",
                            color: "text-danger",
                            title: "Entrenamiento Personalizado",
                            desc: "Rutinas hechas a medida para alcanzar tus objetivos más rápido."
                        },
                        {
                            icon: "bi-cup-hot-fill",
                            color: "text-warning",
                            title: "Nutrición y Suplementación",
                            desc: "Asesoramiento nutricional para complementar tu entrenamiento."
                        },
                        {
                            icon: "bi-people-fill",
                            color: "text-primary",
                            title: "Clases Grupales",
                            desc: "Yoga, spinning, funcional y más actividades para todos los niveles."
                        }
                    ].map((serv, idx) => (
                        <div className="col-md-4 mb-4" key={idx}>
                            <div className="p-4 border rounded shadow-sm bg-white h-100">
                                <i className={`bi ${serv.icon} fs-1 ${serv.color} mb-3`}></i>
                                <h5>{serv.title}</h5>
                                <p>{serv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="bg-light py-5" id="testimonios">
                <div className="container">
                    <h2 className="text-center mb-4">Lo que dicen nuestros clientes</h2>
                    <div className="row text-center">
                        {[
                            { texto: "Gracias a IronGym logré bajar 10kg y sentirme más fuerte que nunca.", autor: "Carla M." },
                            { texto: "Ambiente excelente, entrenadores súper capacitados y buenos equipos.", autor: "Luis R." },
                            { texto: "¡Me encantan las clases grupales! Siempre salgo motivado y con energía.", autor: "Sofía G." }
                        ].map((testi, idx) => (
                            <div className="col-md-4" key={idx}>
                                <blockquote className="blockquote">
                                    <p>"{testi.texto}"</p>
                                    <footer className="blockquote-footer">{testi.autor}</footer>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container py-5" id="faq">
                <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
                <div className="accordion" id="faqAccordion">
                    {[
                        {
                            id: "faq1",
                            pregunta: "¿Puedo probar el gimnasio antes de pagar?",
                            respuesta: "Sí, ofrecemos un pase de prueba gratuito de 1 día. Visítanos y prueba nuestras instalaciones sin compromiso."
                        },
                        {
                            id: "faq2",
                            pregunta: "¿Puedo congelar mi membresía?",
                            respuesta: "Sí, puedes congelar tu plan trimestral o anual por razones médicas o viajes. Consulta en recepción."
                        }
                    ].map((faq, idx) => (
                        <div className="accordion-item" key={idx}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${faq.id}`}>
                                    {faq.pregunta}
                                </button>
                            </h2>
                            <div id={faq.id} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">{faq.respuesta}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-dark text-white text-center py-4 mt-5">
                <div className="container">
                    <p className="mb-1">&copy; {new Date().getFullYear()} IronGym. Todos los derechos reservados.</p>
                    <p>Hecho con 💪 en IronGym</p>
                    <div>
                        <i className="bi bi-facebook mx-2"></i>
                        <i className="bi bi-instagram mx-2"></i>
                        <i className="bi bi-envelope mx-2"></i>
                    </div>
                </div>
            </footer>

            {/* MODAL */}
            {showModal && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                    <div className="modal-box" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <h4>¿Ya tienes una cuenta?</h4>
                        <p>Seleccionaste el plan <strong>{planSeleccionado}</strong></p>
                        <div className="modal-buttons">
                            <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
                            <button className="btn btn-success" onClick={handleRegister}>Registrarse</button>
                        </div>
                        <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
