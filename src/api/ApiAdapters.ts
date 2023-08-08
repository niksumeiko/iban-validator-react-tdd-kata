import { createGenericContext } from '../common/context';
import type { NewPayment, Payment } from '../payment/PaymentService';

export interface ApiAdapters {
    createPayment(payment: NewPayment): Promise<Payment>;
}

export const { useContext, createContextProvider: createApiAdapters } =
    createGenericContext<ApiAdapters>();

export function useApiAdapters(): ApiAdapters {
    return useContext().value;
}
