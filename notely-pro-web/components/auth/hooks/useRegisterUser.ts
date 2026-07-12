import { apiClient } from "@/app/apiClient/axiosClient";
import { RegisterValues } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";


export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (values: RegisterValues) => {
            const response = await apiClient.post("/api/auth/register", values);
            return response;
        }
    });
};