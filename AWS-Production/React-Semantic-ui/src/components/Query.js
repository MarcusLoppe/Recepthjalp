import ReactDOM from 'react-dom';
import axios from 'axios';
import React from 'react';

	const mealTime = [
	  { key: 1, text: 'Frukost' , value: 'Frukost'},
	  { key: 2, text: 'Huvudrätt' , value: 'Huvudrätt'},
	  { key: 3, text: 'Middag' , value: 'Middag'},
	  { key: 4, text: 'Efterrätt' , value: 'Efterrätt'}
	]

	const diet = [
	  { key: 1, text: 'Vegetarisk'  , value:  'Vegterainsk' },
	  { key: 2, text: 'Vegan' , value: 'Vegan'},
	  { key: 3, text: 'Glutenfri' , value: 'Glutenfri'},
	  { key: 4, text: 'Laktosfri' , value: 'Laktosfri'}
	]

	const time = [
	  { key: 1, text: 'Under 15min' , value: 'Under 15min' },
	  { key: 2, text: 'Under 30min' , value: 'Under 30min'},
	  { key: 3, text: 'Under 45min' , value: 'Under 45min'},
	  { key: 4, text: 'Under 60min' , value: 'Under 60min'},
	  { key: 5, text: 'Över 60min' , value: 'Över 60min'}
	]

	const grade = [
	  { key: 1, text: 'Färre än 3' , value: 'Mindre än 3' },
	  { key: 2, text: 'Färre än 4' , value: 'Mindre än 4'},
	  { key: 3, text: 'Fler än 4' , value: 'Högre än 4'},
	  { key: 4, text: '5 sjärnor' , value: '5 sjärnor'}
	]
	const kcal = [
	  { key: 1, text: 'Under 200 kcal', value: 'Under 200 kcal' },
	  { key: 2, text: 'Under 500 kcal', value: 'Under 500 kcal' },
	  { key: 3, text: 'Under 1000 kcal', value: 'Under 1000 kcal' },
	];

export {diet,mealTime, time, grade, kcal};
