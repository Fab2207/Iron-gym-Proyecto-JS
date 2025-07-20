import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

import './Estadisticas.css';

const dataMensual = [
    { mes: 'Ene', miembros: 120, ingresos: 6000, altas: 30, bajas: 10 },
    { mes: 'Feb', miembros: 140, ingresos: 7000, altas: 25, bajas: 5 },
    { mes: 'Mar', miembros: 160, ingresos: 8500, altas: 35, bajas: 15 },
    { mes: 'Abr', miembros: 180, ingresos: 9200, altas: 40, bajas: 10 },
    { mes: 'May', miembros: 200, ingresos: 10000, altas: 30, bajas: 5 },
    { mes: 'Jun', miembros: 220, ingresos: 11000, altas: 50, bajas: 8 },
];

const tiposMembresia = [
    { name: 'Básica', value: 100 },
    { name: 'Intermedia', value: 80 },
    { name: 'Premium', value: 120 },
];

const COLORS = ['#007bff', '#28a745', '#ffc107'];

const Estadisticas = () => {
    return (
        <div className="container bg-white rounded-4 shadow p-4" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e9ecef 100%)" }}>
            <h2 className="text-center text-primary fw-bold mb-4">
                <i className="bi bi-graph-up-arrow me-2"></i>Estadísticas Generales
            </h2>

            

            {/* CRECIMIENTO DE MIEMBROS */}
            <div className="mb-5 p-4 rounded-4 bg-light shadow-sm border">
                <h5 className="fw-bold text-primary mb-3">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Crecimiento de miembros
                    <span className="badge bg-primary ms-2">Gráfico</span>
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dataMensual}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="miembros" stroke="#ff2e2e" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* INGRESOS */}
            <div className="mb-5 p-4 rounded-4 bg-light shadow-sm border">
                <h5 className="fw-bold text-success mb-3">
                    <i className="bi bi-currency-dollar me-2"></i>
                    Ingresos mensuales (S/)
                    <span className="badge bg-success ms-2">Gráfico</span>
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataMensual}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ingresos" fill="#28a745" barSize={40} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* PIE - MEMBRESÍAS */}
            <div className="mb-5 p-4 rounded-4 bg-light shadow-sm border">
                <h5 className="fw-bold text-warning mb-3">
                    <i className="bi bi-pie-chart-fill me-2"></i>
                    Distribución de membresías
                    <span className="badge bg-warning text-dark ms-2">Gráfico</span>
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={tiposMembresia}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {tiposMembresia.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* ALTAS Y BAJAS */}
            <div className="mb-5 p-4 rounded-4 bg-light shadow-sm border">
                <h5 className="fw-bold text-danger mb-3">
                    <i className="bi bi-arrow-down-up me-2"></i>
                    Altas vs. bajas por mes
                    <span className="badge bg-danger ms-2">Gráfico</span>
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dataMensual}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="altas" stroke="#0dcaf0" strokeWidth={2} />
                        <Line type="monotone" dataKey="bajas" stroke="#dc3545" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* TENDENCIA ACUMULADA */}
            <div className="mb-5 p-4 rounded-4 bg-light shadow-sm border">
                <h5 className="fw-bold text-dark mb-3">
                    <i className="bi bi-bar-chart-steps me-2"></i>
                    Tendencia acumulada de miembros
                    <span className="badge bg-dark ms-2">Gráfico</span>
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dataMensual}>
                        <defs>
                            <linearGradient id="colorMiembros" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="miembros"
                            stroke="#FFD700"
                            fillOpacity={1}
                            fill="url(#colorMiembros)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* TABLA RESUMEN */}
            <div className="tabla-contenedor mt-4">
                <h5 className="titulo-tabla mb-3">
                    <i className="bi bi-table me-2"></i>
                    <span>📅 Tabla Mensual</span>
                </h5>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle rounded-3 overflow-hidden shadow-sm">
                        <thead className="table-primary">
                            <tr>
                                <th>Mes</th>
                                <th>Miembros</th>
                                <th>Ingresos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataMensual.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.mes}</td>
                                    <td>{item.miembros}</td>
                                    <td>S/ {item.ingresos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;
