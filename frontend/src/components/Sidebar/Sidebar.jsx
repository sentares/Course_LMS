import React from 'react'
import styles from './styles.module.scss'
import SidebarModules from './modules/SidebarModules'
import { ImExit } from 'react-icons/im'
import { RiSettings5Fill } from 'react-icons/ri'
import { FaRegStar } from 'react-icons/fa'

const Sidebar = () => {
	const { role } = SidebarModules()

	return (
		<div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800'>
			<div className='fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r'>
				<div className='flex items-center justify-center h-14 border-b'>
					<div>Студент</div>
				</div>
				<div className='overflow-y-auto overflow-x-hidden flex-grow'>
					<ul className='flex flex-col py-4 space-y-1'>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Домашняя
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Курсы
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5 flex items-center justify-center text-2xl'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<FaRegStar />
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Избранное
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>Чат</span>
							</a>
						</li>
						<li className='px-5'>
							<div className='flex flex-row items-center h-8'>
								<div className='text-sm font-light tracking-wide text-gray-500'>
									Tasks
								</div>
							</div>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Задания
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Clients
								</span>
								<span className='px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full'>
									15
								</span>
							</a>
						</li>
						<li className='px-5'>
							<div className='flex flex-row items-center h-8'>
								<div className='text-sm font-light tracking-wide text-gray-500'>
									Settings
								</div>
							</div>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
										></path>
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Profile
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5 flex items-center justify-center text-2xl'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<RiSettings5Fill />
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Settings
								</span>
							</a>
						</li>
						<li>
							<a
								href='#'
								className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
							>
								<span className='inline-flex justify-center items-center ml-4'>
									<svg
										className='w-5 h-5 flex items-center justify-center text-2xl'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<ImExit />
									</svg>
								</span>
								<span className='ml-2 text-sm tracking-wide truncate'>
									Выйти
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Sidebar