import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';
import {
  ArticleStateType,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  OptionType,
} from 'src/constants/articleProps';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import { ArrowButton } from '../../ui/arrow-button';

import { useOutsideClickClose } from '../../hooks/useOutsideClickClose'


type ArticleParamsFormProps = {
	onSubmit: (data: ArticleStateType) => void;
	onReset: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit, onReset } : ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	function handleToggle() {
		setIsSidebarOpen(!isSidebarOpen);
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit(formState);
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onReset(defaultArticleState);
	};

	const handleOptionsChange = (fieldName: string) => {
		return (value: OptionType) => {
			// Обновляем состояние формы с выбранным значением
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: () => setIsSidebarOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {[styles.container_open]:isSidebarOpen})}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionsChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleOptionsChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOptionsChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionsChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionsChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>	
				</form>
			</aside>
		</>	
	);
};