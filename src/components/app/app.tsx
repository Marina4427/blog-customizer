import { CSSProperties, useState } from 'react';

import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import styles from './App.module.scss';

export const App = () => {
	const [pageState, setPageState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
				onSubmit={setPageState}
				onReset={() => setPageState(defaultArticleState)}
			 />
			<Article />
		</main>
	);
};