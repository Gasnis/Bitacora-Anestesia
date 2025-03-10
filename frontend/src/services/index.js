import axios from 'axios';

const baseURL = 'http://localhost:8080';

const getOps = async () => {
    try {
        const ops = await axios.get(`${baseURL}/ops`);
        console.log("Operations:", ops.data);
        return ops;

    } catch (error) {
        console.error("Error getting operations:", error);
    }

}

const addOp = async (op) => {
    try {
        const response = await axios.post(`${baseURL}/ops`, op);
        console.log("Operation added:", response.data);
        return response;

    } catch (error) {
        console.error("Error adding operation:", error);
    }
}

const deleteOp = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/ops/${id}`);
        console.log("Operation deleted:", response.data);
        return response;

    } catch (error) {
        console.error("Error deleting operation:", error);
    }
}

export { getOps, addOp, deleteOp };