interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Response {
    currencies: Record<string, Omit<Currency, 'code'>>;
}

export interface Result {
    currency?: Currency;
}

export async function findCountryByIso2Code(countryCode: string): Promise<Result> {
    const response = await window.fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}?fields=currencies`,
    );

    if (!response.ok) {
        throw await response.json();
    }

    const data: Response = await response.json();
    const code = Object.keys(data.currencies)[0];
    const currency = data.currencies[code];

    return {
        currency: {
            ...currency,
            code,
        },
    };
}
