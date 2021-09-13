import axios from 'axios';

const URL = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR';

export const fetchData = async () => {
	try {
		const {
			data: { base_code, rates },
		} = await axios.get(URL, {
			headers: {
				'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_EXCHANGERATE_API_KEY,
				'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
			},
		});

		return {
			base_code,
			rates,
		};
	} catch (error) {
		console.log(error);
	}
};

export const fetchNewData = async (from, to) => {
	try {
		const {
			data: { rates },
		} = await axios.get(
			`https://exchangerate-api.p.rapidapi.com/rapid/latest/${from}`,
			{
				headers: {
					'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_EXCHANGERATE_API_KEY,
					'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
				},
			}
		);

		return {
			rates,
		};
	} catch (error) {
		console.log(error);
	}
};

// ${to}
