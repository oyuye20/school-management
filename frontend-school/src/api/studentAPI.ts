import {http} from "../services/http.ts";
import axios from "axios";

import {studentSchemaZod} from "../schemas/schemas.ts";
import z from "zod";
import type {Students} from "../types/types.ts";

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

export const getAllStudents = async (
    page: number, sortBy: string, orderBy: string, search: string
): Promise<Students> => {

    console.log(search)

    if (sortBy && orderBy) {
        return await http
            .get(`api/v1/students?page=${page}`, {
                params: {
                    search: search,
                    sortBy: sortBy,
                    orderBy: orderBy,
                }
            })
            .then((res) => {
                console.log(res.data);

                return res.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }

    return await http
        .get(`api/v1/students?page=${page}`, {
            params: {
                search: search,
            }
        })
        .then((res) => {
            console.log(res.data);

            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};