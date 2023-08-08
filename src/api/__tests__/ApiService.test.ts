import { describe, expect, it } from 'vitest';

import { getValidApiResponse } from '../ApiService';

describe('ApiService', () => {
    describe('retrieve valid api response', () => {
        it('throws API errors when request failed', async () => {
            const response = { ok: false, json: () => Promise.resolve('x') };

            const result = getValidApiResponse(response);

            await expect(result).rejects.toEqual('x');
        });

        it('returns valid response when available', async () => {
            const response = { ok: true, json: () => Promise.resolve('x') };

            const result = getValidApiResponse(response);

            await expect(result).resolves.toBe('x');
        });
    });
});
