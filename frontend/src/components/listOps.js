import React from 'react';
import { Table, Spinner, Container, Button } from 'react-bootstrap';
import './listOps.css';

function listOps({ ops, isLoading, onDelete }) {
  // Ordenar las operaciones por fecha de la más nueva a la más vieja
  const sortedOps = ops.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <Container fluid className="containerOps p-0">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover id="listOpsTable" className='table'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hospital</th>
                <th>Área de Trabajo</th>
                <th>Cirugía</th>
                <th>Anestesia</th>
                <th>Rol</th>
                <th>Nombre del Paciente</th>
                <th>Edad del Paciente</th>
                <th>Nombre del Cirujano</th>
                <th>DNI del Paciente</th>
                <th>Obra Social</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedOps.map((op) => (
                <tr key={op._id}>
                  <td data-label="Fecha">{op.fecha}</td>
                  <td data-label="Hospital">{op.hospital}</td>
                  <td data-label="Área de Trabajo">{op.areaDeTrabajo}</td>
                  <td data-label="Cirugía">{op.cirugia}</td>
                  <td data-label="Anestesia">{op.anestesia}</td>
                  <td data-label="Rol">{op.rol}</td>
                  <td data-label="Nombre del Paciente">{op.nombrePaciente}</td>
                  <td data-label="Edad del Paciente">{op.edadPaciente}</td>
                  <td data-label="Nombre del Cirujano">{op.nombreCirujano}</td>
                  <td data-label="DNI del Paciente">{op.dniPaciente}</td>
                  <td data-label="Obra Social">{op.obraSocial}</td>
                  <td data-label="Acciones">
                    <Button variant="danger" onClick={() => onDelete(op)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default listOps;