import React from 'react'
import { InputLabel, NativeSelect } from "@material-ui/core"
import { FormControl } from "@mui/material"

function CountrySelector({ value, onChange, countries }) {
    return (
        <FormControl style={{marginTop: 20, marginBottom: 30}}>
            <InputLabel shrink htmlFor="country-selector">Chọn quốc gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={e => onChange(e.target.value)}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}
            >
                {countries.map(country =>
                    <option key={country.Slug} value={country.ISO2.toLowerCase()}>
                        {country.Country}
                    </option>

                )}
            </NativeSelect>
        </FormControl>
    )
}

export default CountrySelector