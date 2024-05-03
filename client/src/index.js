import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.querySelector("#app");

const root = createRoot(container);

root.render(< App />);