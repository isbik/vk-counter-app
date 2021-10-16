import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Modal from './panels/Modal';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const [counters, setCounters] = useState([
		{
			id: 1,
			name: "Создать счетчики",
			target: 4,
			completed: 1,
			is_limit: true
		},
	])



	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} >
					<Home id='home' go={go} counters={counters} setCounters={setCounters} />
					<Modal onCreate={(data) => setCounters(prev => [data, ...prev])} id='modal' go={go} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
