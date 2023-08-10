export type Iban = string;

export function formatIban(iban: Iban) {
    return iban.match(/.{1,4}/g)?.join(' ') ?? '';
}
