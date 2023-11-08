const http = require('http');
const { URL } = require('url');
require('dotenv').config();

const PORT = process.env.APP_PORT;

function getRandomDelay() {
    return (Math.floor(Math.random() * 2) + 1) * 1000;
}

function writeResponse(res, data, statusCode) {
    res.writeHead(statusCode, headers);
    if (data) res.write(JSON.stringify(data));
    res.end();
}

function delayResponse(...args) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(...args), getRandomDelay());
    });
}

function writeSuccess(res, data) {
    writeResponse(res, data, 200);
}

function writeErrors(res, errors, statusCode = 500) {
    writeResponse(res, errors, statusCode);
}

function getRequestUrl(req) {
    return new URL(req.url, 'http://' + req.headers.host + '/');
}

const IBANS = {
    AT0309000000000019176655: {
        flags: ['INSTANT', 'POSITIVE_HISTORY', 'PSD2'],
        bank: {
            trustScore: 9,
            name: 'Erste Bank',
            address: {
                street: 'Am Belvedere 1',
                city: 'Vienna',
                zip: '1100',
                country: 'AT',
            },
        },
    },
    RO23INGB0001000000000222: {
        flags: ['POSITIVE_HISTORY'],
        bank: {
            address: { country: 'RO' },
        },
    },
    CZ3608000000002996530173: {
        flags: ['INSTANT', 'SECURITY_CLAIMS', 'PSD2'],
        bank: { trustScore: 4 },
    },
    LV64HABA0551018676991: null,
    HU14116000060000000084586199: {
        flags: ['INSTANT', 'POSITIVE_HISTORY', 'PSD2'],
        bank: {
            trustScore: 10,
            name: 'Erste Bank',
            address: { street: 'Előkapu 2', city: 'Sopron', zip: '9400', country: 'HU' },
        },
    },
    HR8523300033203674306: {
        flags: ['SECURITY_CLAIMS'],
        bank: {
            trustScore: 6,
            name: 'BNP Paribas S.A',
            address: { city: 'Zagreb', country: 'HR' },
        },
    },
    GB29NWBK60161331926819: {
        flags: ['POSITIVE_HISTORY'],
        bank: {
            trustScore: 10,
            name: 'British Business Bank',
            address: { city: 'London', zip: 'EC2R', country: 'GB' },
        },
    },
    SA3245000000001123456001: {
        flags: ['SECURITY_CLAIMS'],
        bank: {
            trustScore: 2,
            address: { country: 'SA' },
        },
    },
};

function handleValidateEndpoint(req, res) {
    const { searchParams } = getRequestUrl(req);
    const iban = searchParams.get('iban')?.toUpperCase();
    delayResponse().then(() => {
        if (!iban) {
            return writeErrors(
                res,
                [
                    {
                        scope: 'iban',
                        message: 'Missing iban',
                    },
                ],
                400,
            );
        }

        if (IBANS[iban] === null) {
            return writeErrors(
                res,
                [
                    {
                        scope: 'iban',
                        message: 'Invalid iban',
                    },
                ],
                400,
            );
        }

        if (!IBANS[iban]) {
            return writeErrors(
                res,
                [
                    {
                        scope: 'iban',
                        message: 'Unknown iban',
                    },
                ],
                404,
            );
        }

        return writeSuccess(res, {
            ...IBANS[iban],
            iban,
        });
    });
}

const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};

http.createServer((req, res) => {
    const { pathname } = getRequestUrl(req);

    if (req.method === 'OPTIONS') {
        return writeResponse(res, undefined, 204);
    }

    if (req.method === 'GET') {
        if (pathname === '/validate') {
            return handleValidateEndpoint(req, res);
        }
    }

    writeErrors(res, [{ message: 'Not found' }], 404);
}).listen(PORT, () => console.info('API ready/started'));
