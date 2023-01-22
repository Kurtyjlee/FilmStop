import './SearchBar.scss'
import './Header.scss';

import { FunctionComponent, useState } from "react";

export const SearchBar = () => {
	const [open, setOpen] = useState(false);

	return (
		<li className='search-bar-container'>
			<input
				className="search-bar"
				name="SearchBar"
				placeholder="Search"
			/>
		</li>
	);
}