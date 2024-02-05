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
