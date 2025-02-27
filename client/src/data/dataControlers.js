import api from '../axios/api';

const postTransction = async (data) => {
    try {
        const response = await api.post('/api/expense/addExpense', data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error posting transaction:', error);
        throw error; // Rethrow or handle the error as needed
    }
};

export default postTransction;
