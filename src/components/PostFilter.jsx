import React from 'react'
import { MySelect } from './ui/select/MySelect';
import { MyInput } from './ui/input/MyInput';

export const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
    <MyInput
      value={filter.query}
      onChange={e => setFilter({...filter, query: e.target.value})}
      placeholder='search...'
    />
   <MySelect
    value={filter.sort}
    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
    defaultValue='Sort By'
    option={[
      {value: 'title', name: 'By Name'},
      {value: 'body', name: 'By Description'}
    ]}
   />
  </div>
  )
}
