import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NavHeadlines(props) {
	const location = useLocation();

	// this depens on the current url change if url is changed
	const headlines = {
		home: "Home",
		profile: "Profile",
		groups: "Groups",
		admin: "User Overview",
		register: "Register User",
		manageGroups: "Manage Groups",
	}

  return (
		<>
		{ headlines[location.pathname.replace('/', '')] !== undefined &&
			<div className='container mt-3 mb-3'>
				<h3 style={{color:'grey'}}>{headlines[location.pathname.replace('/', '')]}</h3>
				<div style={{borderBottom: "1px solid grey"}}></div>
			</div>
		}
		</>
	)
   
}
