import React, { useRef, useState } from 'react';

import { FormItem, FormLayout, Input, Panel, PanelHeader, PanelHeaderBack, Button, FormLayoutGroup, Snackbar } from '@vkontakte/vkui';
import { Checkbox } from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";


const Modal = props => {


	const [name, setName] = useState('')
	const [isLimit, setIsLimit] = useState(false)
	const [completed, setCompleted] = useState(0)
	const [target, setTarget] = useState(10)
	const [snackbar, setSnackbar] = useState(null)

	const handleCreate = (e) => {

		if (!name && !Number.isInteger(completed)) {
			setSnackbar(
				<Snackbar
					onClose={() => setSnackbar(null)}
				>
					Заполните все поля
				</Snackbar>
			);
			return
		}
		if (isLimit && target < completed) {
			setSnackbar(
				<Snackbar
					onClose={() => setSnackbar(null)}
				>
					Цель не может быть больше, того сколько уже сделано
				</Snackbar>
			);
			return
		}

		props.onCreate({
			id: Date.now(),
			completed,
			name,
			is_limit: isLimit,
			target
		})


		props.go(e)
	}

	return (
		<Panel>

			<PanelHeader
				left={<PanelHeaderBack onClick={props.go} data-to="home" />}
			>
				Добавить счетчик
			</PanelHeader>
			<FormLayout>
				<FormItem
					top="Что будем считать?">
					<Input
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</FormItem>
				<Checkbox value={isLimit} onClick={() => setIsLimit(p => !p)}>Без лимита</Checkbox>

				<FormLayoutGroup mode="horizontal">
					<FormItem top="Сколько сделано?">
						<Input
							min={0}
							type="number"
							value={completed}
							onChange={(e) => setCompleted(e.target.value)}

						/>
					</FormItem>
					{isLimit &&
						<FormItem top="Сколько надо?" >
							<Input
								min={completed}
								type="number"
								value={target}
								onChange={(e) => setTarget(e.target.value)}

							/>
						</FormItem>
					}
				</FormLayoutGroup>
				<FormItem>
					<Button data-to="home" onClick={handleCreate} mode="commerce" size="l" stretched>Создать</Button>
				</FormItem>
			</FormLayout>
			{snackbar}

		</Panel>
	)
};


export default Modal;
