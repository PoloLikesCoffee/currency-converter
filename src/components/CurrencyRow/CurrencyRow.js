import React from 'react';
import {
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';

const CurrencyRow = ({
	currencyOptions,
	selectedCurrency,
	handleChangeCurrency,
	amount,
	handleChangeAmount,
}) => {
	if (!amount) {
		return 'Loading...';
	}

	return (
		<Grid container spacing={6}>
			<Grid item xs={8} md={9} sm={8}>
				<TextField
					type="number"
					label="Amount"
					fullWidth
					InputProps={{ inputProps: { min: 1 } }}
					value={amount}
					onChange={handleChangeAmount}
				/>
			</Grid>
			<Grid item xs={4} md={3} sm={4}>
				<FormControl fullWidth>
					<InputLabel>Currency</InputLabel>
					<Select value={selectedCurrency} onChange={handleChangeCurrency}>
						{currencyOptions.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default CurrencyRow;
