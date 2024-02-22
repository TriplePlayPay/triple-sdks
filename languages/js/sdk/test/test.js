const { expect } = require("chai");
const { client } = require("../src");

describe('TriplePlayClient.config', () => {
    it('TriplePlayClient should fail when options missing fetch', () => {
        let f = globalThis.fetch;
        globalThis.fetch = null;
        try {
            expect(() => client({ fetch: null, bearerToken: 'b' })).to.throw(/please use node-fetch/);
            expect(() => client({ fetch: () => {}, bearerToken: 'b' })).to.not.throw();
        } finally {
            globalThis.fetch = f;
        }
        expect(() => client({ fetch: () => {}, bearerToken: 'b' })).to.not.throw();
    });

    it('TriplePlayClient should fail when options missing bearer', () => {
        expect(() => client({ fetch: () => {}, bearerToken: 'b' })).to.not.throw();
        expect(() => client({ fetch: () => {}, bearerToken: '' })).to.throw();
    });
});

describe('TriplePlayClient requests work', () => {
    it('create credit card works', async () => {
        /** @type {{url: string, options: RequestInit}[]} */
        let requests = [];

        /** @type {Response[]} */
        let responses = [];

        /**
         * @param {string} url
         * @param {RequestInit} options
         * @return {*}
         */
        async function fetch(url, options) {
            requests.push({ url, options });
            return responses.pop();
        }
        let c = client({ bearerToken: 'b', fetch })

        responses.push(new Response('{}', { headers: { 'content-type': 'application/json' } }));

        await c.createCreditCard({
            cc: 'cc',
            mm: 'mm',
            yy: 'yy',
        });

        expect(requests).has.length(1);

        let request = requests.pop();

        expect(request.url).to.eql('https://tripleplaypay.com/api/card');
        expect(request.options.method).to.eql('POST');
        expect(request.options.headers).to.eql({
            'content-type': 'application/json',
            'authorization': 'bearer b',
        });
    })

    it('report calling works', async () => {
        /** @type {{url: string, options: RequestInit}[]} */
        let requests = [];

        /** @type {Response[]} */
        let responses = [];

        /**
         * @param {string} url
         * @param {RequestInit} options
         * @return {*}
         */
        async function fetch(url, options) {
            requests.push({ url, options });
            return responses.pop();
        }
        let c = client({ bearerToken: 'b', fetch })

        responses.push(new Response('{}', { headers: { 'content-type': 'application/json' } }));

        await c.report({
            start: '2024-01-20',
            end: '2024-02-20',
        });

        expect(requests).has.length(1);

        let request = requests.pop();

        expect(request.url).to.eql('https://tripleplaypay.com/api/report?start=2024-01-20&end=2024-02-20');
        expect(request.options.method).to.eql('GET');
        expect(request.options.headers).to.eql({
            'content-type': 'application/json',
            'authorization': 'bearer b',
        });
    })
});
