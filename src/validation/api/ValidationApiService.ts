const apiUrl = process.env.API_URL;

export type ValidationResponse = {
    iban: string;
    flags: ('INSTANT' | 'POSITIVE_HISTORY' | 'SECURITY_CLAIMS' | 'PSD2')[];
    bank?: {
        trustScore?: number;
    };
};

type AdapterOptions = {
    request?: typeof window.fetch;
};

export function createIbanValidationApiAdapter(
    iban: string,
    { request = window.fetch }: AdapterOptions = {},
) {
    return async (): Promise<ValidationResponse> => {
        const response = await request(`${apiUrl}/validate?iban=${iban}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();

        if (response.ok) {
            return result;
        }

        throw result;
    };
}
