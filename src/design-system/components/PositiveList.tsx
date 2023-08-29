interface Props {
    items: string[];
}

export const PositiveList = ({ items }: Props) => (
    <ul className="my-8 divide-y divide-gray-100">
        {items.map((result) => (
            <li key={result} className="px-3 text-lg leading-10 odd:bg-gray-50">
                <svg
                    viewBox="0 0 32 32"
                    width="1.2em"
                    height="1.2em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block"
                >
                    <path
                        fill="#66ba1c"
                        d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415l-9 8.999z"
                    />
                    <path
                        fill="#66ba1c"
                        d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
                    />
                </svg>
                <span className="pl-2">{result}</span>
            </li>
        ))}
    </ul>
);
