import React from 'react';
import { Table, Spinner, Container, Button } from 'react-bootstrap';
import './listOps.css';

function listOps({ ops, isLoading, onDelete }) {
  // Ordenar las operaciones por fecha de la más nueva a la más vieja
  const sortedOps = ops.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <Container className="containerOps">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover id="listOpsTable" className='table'>
          <thead >
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
                <td>{op.fecha}</td>
                <td>{op.hospital}</td>
                <td>{op.areaDeTrabajo}</td>
                <td>{op.cirugia}</td>
                <td>{op.anestesia}</td>
                <td>{op.rol}</td>
                <td>{op.nombrePaciente}</td>
                <td>{op.edadPaciente}</td>
                <td>{op.nombreCirujano}</td>
                <td>{op.dniPaciente}</td>
                <td>{op.obraSocial}</td>
                <td>
                  <Button variant="danger" onClick={() => onDelete(op)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default listOps;