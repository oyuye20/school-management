import {http} from "../services/http.ts";
import axios from "axios";

import {studentSchemaZod} from "../schemas/schemas.ts";
import z from "zod";

type StudentFields = z.infer<typeof studentSchemaZod>;

export const addStudents = async (data: StudentFields) => {
    try {
        const res = await http.post('api/v1/students', data);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            throw error;
        }
    }
}