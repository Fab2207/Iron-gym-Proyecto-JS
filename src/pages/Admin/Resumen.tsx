import React from 'react';

const Resumen: React.FC = () => {
    return (
        <div className="container p-4 rounded-4 shadow" style={{ background: "linear-gradient(135deg, #232526 0%, #414345 100%)", color: '#fff' }}>
            <h3 className="fw-bold mb-4 text-center" style={{ color: '#FFD700', letterSpacing: 1 }}>
                <i className="bi bi-clipboard-data me-2"></i>Resumen General del Gimnasio
            </h3>

            {/* KPIs Destacados */}
            <div className="row g-4 mb-4">
                <div className="col-md-3 col-6">
                    <div className="card border-0 rounded-4 shadow-sm kpi-card h-100" style={{ background: '#181818', transition: 'transform 0.2s' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-person-fill display-4 mb-2" style={{ color: '#FFD700' }}></i>
                            <h6 className="card-title fw-bold text-white">Miembros Activos</h6>
                            <span className="badge bg-warning text-white fs-5 mb-2">256</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="card border-0 rounded-4 shadow-sm kpi-card h-100" style={{ background: '#181818', transition: 'transform 0.2s' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-cash-stack display-4 mb-2" style={{ color: '#28a745' }}></i>
                            <h6 className="card-title fw-bold text-white">Ingresos Mensuales</h6>
                            <span className="badge bg-success text-white fs-5 mb-2">$15,000</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="card border-0 rounded-4 shadow-sm kpi-card h-100" style={{ background: '#181818', transition: 'transform 0.2s' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-calendar-check-fill display-4 mb-2" style={{ color: '#0dcaf0' }}></i>
                            <h6 className="card-title fw-bold text-white">Clases Programadas</h6>
                            <span className="badge bg-info text-white fs-5 mb-2">18 esta semana</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="card border-0 rounded-4 shadow-sm kpi-card h-100" style={{ background: '#181818', transition: 'transform 0.2s' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-graph-up-arrow display-4 mb-2" style={{ color: '#ff2e2e' }}></i>
                            <h6 className="card-title fw-bold text-white">Nuevos Miembros</h6>
                            <span className="badge bg-danger text-white fs-5 mb-2">+15%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicadores rápidos */}
            <div className="row mb-4 text-center">
                <div className="col-6 col-md-3 mb-2">
                    <span className="text-success fw-bold"><i className="bi bi-arrow-up-circle me-1"></i>Altas: 30</span>
                </div>
                <div className="col-6 col-md-3 mb-2">
                    <span className="text-danger fw-bold"><i className="bi bi-arrow-down-circle me-1"></i>Bajas: 5</span>
                </div>
                <div className="col-6 col-md-3 mb-2">
                    <span className="text-info fw-bold"><i className="bi bi-clock-history me-1"></i>Prom. Asistencia: 82%</span>
                </div>
                <div className="col-6 col-md-3 mb-2">
                    <span className="text-warning fw-bold"><i className="bi bi-star-fill me-1"></i>Satisfacción: 4.7/5</span>
                </div>
            </div>

            {/* Notas Administrativas */}
            <div className="p-4 rounded-4" style={{ background: '#232526', border: '1px solid #333' }}>
                <h5 className="fw-bold mb-3" style={{ color: '#FFD700' }}><i className="bi bi-graph-up-arrow me-2"></i>Notas Administrativas</h5>
                <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-dot text-warning me-2"></i>Nuevo lote de pesas llegará el <b>lunes</b>.</li>
                    <li className="mb-2"><i className="bi bi-dot text-success me-2"></i>Inscripción de nuevos clientes en aumento <b>(+15%)</b>.</li>
                    <li className="mb-2"><i className="bi bi-dot text-info me-2"></i>Clase de CrossFit del jueves fue <b>reprogramada</b>.</li>
                    <li className="mb-2"><i className="bi bi-dot text-danger me-2"></i>Recuerda actualizar los datos de membresía este mes.</li>
                </ul>
            </div>
        </div>
    );
};

export default Resumen;
