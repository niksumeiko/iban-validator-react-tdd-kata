import { describe, expect, it } from 'vitest';

import { formatIban } from '../IbanService';

describe('IbanService', () => {
    describe('iban formatting', () => {
        it('returns formatted iban', () => {
            const iban = 'AT0309000000000019176655';

            const result = formatIban(iban);

            expect(result).toBe('AT03 0900 0000 0000 1917 6655');
        });
    });
});
