import { apiClient } from "@/app/apiClient/axiosClient";
import { LoginValues } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";



export const useLoginUser = () => {
    return useMutation({
        mutationFn: async (values: LoginValues) => {
            const response = await apiClient.post("/api/auth/login", values);
            return response;
        }
    });
};