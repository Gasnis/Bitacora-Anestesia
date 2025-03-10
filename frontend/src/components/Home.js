import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListOps from "./listOps";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { addOp, getOps, deleteOp } from "../services/index";
import "./home.css"

const OpsLayout = ({ name }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOp, setSelectedOp] = useState(null);
    const [formData, setFormData] = useState({
        hospital: "",
        nombre: name || "",
        areaDeTrabajo: "Residencia de Anestesiologia",
        fecha: "",
        cirugia: "",
        anestesia: "",
        rol: "",
        nombrePaciente: "",
        edadPaciente: "",
        nombreCirujano: "",
        dniPaciente: "",
        obraSocial: ""
    });
    const [ops, setOps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchDni, setSearchDni] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (name) {
            loadOps();
        }
    }, [name]);

    const loadOps = async () => {
        try {
            const response = await getOps();
            if (response?.status === 200) {
                setOps(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error loading operations:", error);
        }
    };

    const handleShow = () => {
        setFormData({ ...formData, nombre: name });
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const handleDeleteShow = (op) => {
        setSelectedOp(op);
        setShowDeleteModal(true);
    };
    const handleDeleteClose = () => setShowDeleteModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.hospital) newErrors.hospital = "El hospital es requerido";
        if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
        if (!formData.areaDeTrabajo) newErrors.areaDeTrabajo = "El área de trabajo es requerida";
        if (!formData.fecha) newErrors.fecha = "La fecha es requerida";
        if (!formData.cirugia) newErrors.cirugia = "La cirugía es requerida";
        if (!formData.anestesia) newErrors.anestesia = "La anestesia es requerida";
        if (!formData.rol) newErrors.rol = "El rol es requerido";
        if (!formData.nombrePaciente) newErrors.nombrePaciente = "El nombre del paciente es requerido";
        if (!formData.edadPaciente) newErrors.edadPaciente = "La edad del paciente es requerida";
        if (!formData.nombreCirujano) newErrors.nombreCirujano = "El nombre del cirujano es requerido";
        if (!formData.dniPaciente) newErrors.dniPaciente = "El DNI del paciente es requerido";
        if (!formData.obraSocial) newErrors.obraSocial = "La obra social es requerida";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            await addOp(formData);
            handleClose();
            loadOps(); // Refrescar la lista de operaciones
        } catch (error) {
            console.error("Error adding operation:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteOp(selectedOp._id);
            handleDeleteClose();
            loadOps(); // Refrescar la lista de operaciones
        } catch (error) {
            console.error("Error deleting operation:", error);
        }
    };

    const generatePDF = () => {
        const input = document.getElementById("listOpsTable");
        if (!input) return;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210; // Ancho en mm para A4
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("listOps.pdf");
        });
    };

    // Filtrar las operaciones por DNI y nombre del usuario
    const filteredOps = ops.filter(op => op.dniPaciente.includes(searchDni) && op.nombre === name);

    if (!name) {
        return (
            <Container fluid>
                <header className="text-center my-4">
                    <h1>Bitácora</h1>
                </header>
                <Row className="mb-3 justify-content-center">
                    <Col xs="auto">
                        <Button onClick={() => navigate('/login')}>Login</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid>
            <header className="text-center my-4">
                <h1>Bitácora</h1>
                <h2>Bienvenido {name}</h2>
            </header>

            <Row className="mb-3 justify-content-center">
                <Col xs="auto">
                    <Button onClick={handleShow}>AGREGAR</Button>
                </Col>
                <Col xs="auto">
                    <Button onClick={generatePDF}>Generar PDF</Button>
                </Col>
            </Row>

            <Row className="mb-3 justify-content-center">
                <Col xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Buscar por DNI"
                        value={searchDni}
                        onChange={(e) => setSearchDni(e.target.value)}
                    />
                </Col>
            </Row>

            <div id="listOpsTable" className="table-responsive">
                <ListOps ops={filteredOps} isLoading={isLoading} onDelete={handleDeleteShow} />
            </div>

            {/* Modal para agregar */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Bitácora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="danger">
                                {Object.values(errors).map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </Alert>
                        )}
                        <Form.Group controlId="formHospital">
                            <Form.Label>Hospital</Form.Label>
                            <Form.Control as="select" name="hospital" value={formData.hospital} onChange={handleChange}>
                                <option value="">Seleccione un hospital</option>
                                <option>DR. ENRIQUE VERA BARROS</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAreaTrabajo">
                            <Form.Label>Área de Trabajo</Form.Label>
                            <Form.Control as="select" name="areaDeTrabajo" value={formData.areaDeTrabajo} onChange={handleChange}>
                                <option value="">Seleccione un área de trabajo</option>
                                <option>Residencia de Anestesiologia</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formCirugia">
                            <Form.Label>Cirugía</Form.Label>
                            <Form.Control type="text" name="cirugia" value={formData.cirugia} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formAnestesia">
                            <Form.Label>Anestesia</Form.Label>
                            <Form.Control type="text" name="anestesia" value={formData.anestesia} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formRol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control type="text" name="rol" value={formData.rol} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formNombrePaciente">
                            <Form.Label>Nombre del Paciente</Form.Label>
                            <Form.Control type="text" name="nombrePaciente" value={formData.nombrePaciente} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formEdadPaciente">
                            <Form.Label>Edad del Paciente</Form.Label>
                            <Form.Control type="number" name="edadPaciente" value={formData.edadPaciente} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formNombreCirujano">
                            <Form.Label>Nombre del Cirujano</Form.Label>
                            <Form.Control type="text" name="nombreCirujano" value={formData.nombreCirujano} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formDniPaciente">
                            <Form.Label>DNI del Paciente</Form.Label>
                            <Form.Control type="text" name="dniPaciente" value={formData.dniPaciente} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formObraSocial">
                            <Form.Label>Obra Social</Form.Label>
                            <Form.Control type="text" name="obraSocial" value={formData.obraSocial} onChange={handleChange} />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal para eliminar */}
            <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta operación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OpsLayout;
