import React, { useEffect, useState } from 'react';
import './scss/Style.scss';
import CurrencyRow from './components/CurrencyRow/CurrencyRow';
import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Divider,
} from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { fetchData, fetchNewData } from './api';

const theme = createTheme({
	typography: {
		fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
	},
});

const App = () => {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState('');
	const [toCurrency, setToCurrency] = useState('');
	const [exchangeRate, setExchangeRate] = useState();
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useEffect(() => {
		const getData = async () => {
			const firstCurrency = Object.keys(await (await fetchData()).rates)[70];
			setCurrencyOptions([...Object.keys(await (await fetchData()).rates)]);
			setFromCurrency(await (await fetchData()).base_code);
			setToCurrency(firstCurrency);
			setExchangeRate(await (await fetchData()).rates[firstCurrency]);
		};
		getData();
	}, []);

	useEffect(() => {
		if (fromCurrency && toCurrency) {
			const getNewData = async () => {
				setExchangeRate(
					await (
						await fetchNewData(fromCurrency, toCurrency)
					).rates[toCurrency]
				);
			};
			getNewData();
		}
	}, [fromCurrency, toCurrency]);

	const handleFromChangeAmount = (event) => {
		if (event.target.value === 0 || !event.target.value) {
			setAmount(1);
		} else {
			setAmount(event.target.value);
		}

		setAmountInFromCurrency(true);
	};

	const handleToChangeAmount = (event) => {
		if (event.target.value === 0 || !event.target.value) {
			setAmount(1);
		} else {
			setAmount(event.target.value);
		}
		setAmountInFromCurrency(false);
	};

	return (
		<MuiThemeProvider theme={theme}>
			<Grid
				container
				spacing={0}
				alignItems="center"
				justifyContent="center"
				style={{ height: '100vh' }}
			>
				<Grid item xs={11} sm={6}>
					<Card className="card">
						<CardHeader align="center" title="Convert" />
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<CurrencyRow
										currencyOptions={currencyOptions}
										selectedCurrency={fromCurrency}
										handleChangeCurrency={(event) =>
											setFromCurrency(event.target.value)
										}
										amount={fromAmount}
										handleChangeAmount={handleFromChangeAmount}
									/>
								</Grid>
							</Grid>
							<Divider
								style={{
									margin: '36px 47% 10px 47%',
									backgroundColor: '#363636',
									height: '2px',
								}}
							/>
							<Divider
								style={{
									margin: '10px 47% 26px 47%',
									backgroundColor: '#363636',
									height: '2px',
								}}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<CurrencyRow
										currencyOptions={currencyOptions}
										selectedCurrency={toCurrency}
										handleChangeCurrency={(event) =>
											setToCurrency(event.target.value)
										}
										amount={toAmount}
										handleChangeAmount={handleToChangeAmount}
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</MuiThemeProvider>
	);
};

export default App;
