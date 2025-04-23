// webpack.mix.js
import { ts, react } from 'laravel-mix';

ts('resources/js/app.ts', 'public/js')
   .ts('resources/js/dashboard.ts', 'public/js')
   .ts('resources/js/admin-dashboard.ts', 'public/js')
   .postCss('resources/css/app.css', 'public/css', [
     // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
     require('tailwindcss'),
   ]);

react();
