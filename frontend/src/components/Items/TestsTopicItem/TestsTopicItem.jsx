import React, { useState } from 'react'
import Input from '../../../ui/input/Input'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setRegulateCountOfQuestionInTopic } from '../../../redux/slices/topicSlice'

const TestsTopicItem = ({
	role,
	testsTopics,
	idOfClickedTopic,
	handleChangeTopicInfoBlock,
	checkIsGoodRule,
}) => {
	const dispacth = useDispatch()
	const [countOfQuestionsInTopics, setCountOfQuestionsInTopics] = useState(
		testsTopics.reduce(
			(acc, topic) => ({
				...acc,
				[topic.id_topic]: topic.regulate_count_question || 0,
			}),
			{}
		)
	)

	const handleChangeCountQuestionsOfTopic = async (id_topic, newValue) => {
		dispacth(
			setRegulateCountOfQuestionInTopic({
				...countOfQuestionsInTopics,
				[id_topic]: newValue,
			})
		)
		setCountOfQuestionsInTopics({
			...countOfQuestionsInTopics,
			[id_topic]: newValue,
		})
	}

	return (
		<>
			{testsTopics.map((topic, index) => (
				<button
					key={topic.id_topic}
					className={
						idOfClickedTopic === topic.id_topic
							? styles.clickedTopic
							: styles.questionItem
					}
					onClick={handleChangeTopicInfoBlock.bind(null, topic.id_topic)}
				>
					<span className='font-semibold pr-1'>{index + 1}.</span>
					<div className='flex justify-between items-center w-full'>
						<div>{topic.topic_name}</div>
						<div className='flex items-center justify-end gap-1'>
							<div className='text-gray-400'>
								вопросов: {topic.count_question}
							</div>
							{role === 2 && (
								<Input
									classOfStyle={'count'}
									type={'number'}
									min={0}
									max={topic.count_question}
									placeholder={0}
									value={countOfQuestionsInTopics[topic.id_topic]}
									onChange={e =>
										handleChangeCountQuestionsOfTopic(
											topic.id_topic,
											parseInt(e.target.value)
										)
									}
								/>
							)}
						</div>
					</div>
				</button>
			))}
		</>
	)
}

export default TestsTopicItem
