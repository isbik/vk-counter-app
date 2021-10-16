import React from 'react';

import { Panel, PanelHeader, Button, Group, Card, RichCell, Gradient, Title, Text } from '@vkontakte/vkui';
import { Icon16Minus, Icon24Add } from "@vkontakte/icons";

const Home = ({ id, go, counters, setCounters }) => {


	const handleUpdate = (id, count) => {


		setCounters(prev => {
			const index = prev.findIndex(c => c.id === id)

			prev[index].completed += count

			return [...prev]
		})
	}

	const handleDelete = id => {
		setCounters(prev => prev.filter(c => c.id !== id))
	}

	return (
		<Panel id={id}>
			<PanelHeader>Счетчики</PanelHeader>
			{counters.length === 0 ?
				<Panel id="gradient">
					<Gradient style={{
						// margin: sizeX === SizeType.REGULAR ? '-7px -7px 0 -7px' : 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						padding: 32,
					}}>
						<Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="medium">Вы завершили все счетчики</Title>
						<Text style={{ marginBottom: 24, color: 'var(--text_secondary)' }}>Как насчет нового challenge?</Text>
						<Button onClick={go} data-to="modal">Создать счетчик</Button>
					</Gradient>

				</Panel> :

				<Button style={{ margin: 10 }} onClick={go} data-to="modal">Добавить счетчик</Button>
			}

			{counters.map(counter => (
				<Card key={counter.id} style={{ margin: 10 }} mode="outline">
					<RichCell
						disabled
						multiline
						after={counter.target ? counter.completed + '/' + counter.target : counter.completed}
						actions={
							<>
								<Button onClick={() => handleUpdate(counter.id, 1)} disabled={counter.target == counter.completed} before={<Icon24Add />} />
								<Button onClick={() => handleUpdate(counter.id, -1)} disabled={counter.completed === 0} before={<Icon16Minus />} />
								<Button onClick={() => handleDelete(counter.id)} mode="destructive">Удалить</Button>
							</>
						}
					>
						{counter.name}
					</RichCell>
				</Card>
			))}


		</Panel>
	)
};


export default Home;
