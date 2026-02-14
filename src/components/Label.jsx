import React from 'react';


export default function Label({modifier}){
	return (<label className={`label label-${modifier}`}></label>);
}
