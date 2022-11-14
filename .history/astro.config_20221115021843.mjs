import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // enable the react renderer
    renderers: ['@astrojs/renderer-react'],
    // enable the GitHubCalendar component
    vite: {
        optimizeDeps: {
            include: ['github-calendar'],
        },
    },
    
});
