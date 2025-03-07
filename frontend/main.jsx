import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './pages/index/App.jsx';
import Teste from './pages/teste/Teste.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/teste" element={<Teste />} />
		</Routes>
	</BrowserRouter>,
);
