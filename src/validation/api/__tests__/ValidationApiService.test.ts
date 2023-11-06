import { describe, expect, it, vi } from 'vitest';

import { createIbanValidationApiAdapter } from '../ValidationApiService';
const apiUrl = import.meta.env.VITE_API_URL;

describe('api adapter factory', () => {
    it('returns successful response for provided iban', async () => {
        const iban = 'x';
        const spy = vi.fn().mockResolvedValue({
            ok: true,
            json: () => ({ iban: 'x', flags: [] }),
        });

        const adapter = createIbanValidationApiAdapter(iban, { request: spy });
        const result = await adapter();

        expect(result).toEqual({ iban: 'x', flags: [] });
        expect(spy).toHaveBeenCalledWith(`${apiUrl}/validate?iban=x`, {
            headers: { 'Content-Type': 'application/json' },
        });
    });

    it('throws error when request fails', async () => {
        const iban = 'x';
        const mock = vi.fn().mockResolvedValue({
            ok: false,
            json: () => 'y',
        });

        const adapter = createIbanValidationApiAdapter(iban, { request: mock });

        await expect(() => adapter()).rejects.toThrowError('y');
    });
});
