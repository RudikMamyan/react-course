import React from 'react'

export const MySelect = ({option, defaultValue, value, onChange}) => {
  return (
    <select
        value={value}
        onChange={e => onChange(e.target.value)}
    >
        <option value='' disabled>{defaultValue}</option>
        {
            option.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )
        }
    </select>
  )
}
