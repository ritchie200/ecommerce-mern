import React from 'react';
import Select from 'react-select';

export default function Dropdown(props) {
  return (
    <Select placeholder={props.placeholder} isClearable={true} options={props.data} onChange={props.handleChange} />
  );
}