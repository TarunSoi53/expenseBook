import React from 'react';
import api from '../axios/api';



const  fetchTransactions= async ()=>{
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await api.get(`/api/expense/getExpenses`);
        console.log(response)
        const data =response.data
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow or handle the error as needed
      }

}
export default fetchTransactions;