'use client';
import { proxy } from 'valtio';
import clamp from 'lodash-es/clamp';
import pingSound from '/pingpong/ping.mp3';

export const state = proxy({
    count: 0,
    api: {
        pong(velocity) {

            const ping = new Audio(pingSound);
            ping.volume = clamp(velocity / 20, 0, 1)*0.1;
            ping.currentTime = 0;
            ping.play().catch(() => {});

            if (velocity > 10) ++state.count;
        },
        reset() {
            state.count = 0;
        },
    },
});
