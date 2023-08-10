import { findCountryByIso2Code } from '@partner/super-countries';

interface InputProps {
    countryCode: string;
}

export function createCountryAdapter({ countryCode }: InputProps) {
    return () => findCountryByIso2Code(countryCode);
}
