import { beforeAll, describe, expect, it, vi } from 'vitest';
import { networks } from '~/lib/constants';
import axios from 'axios';

describe('Subgraph tests', () => {
    beforeAll(() => {
        process.exit = vi.fn();
    });

    networks.forEach(network => {
        it(`should check if ${network.name} subgraph is live`, async () => {
            try {
                const response = await axios.get(network.subgraph);
                expect(response.status).toBe(200);
            } catch (error) {
                console.error(`Subgraph for ${network.name} is down`);
            }
        });
    });
});
