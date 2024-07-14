import React from 'react'

const CustomInput = (props) => {
    const {type,name,placeholder,className,onCh,onBl,val} = props;
  return (
    <div>
      <input 
      type={type}
      name={name}
      value={val}
      onChange={onCh}
      // onBlur={onBl}
      placeholder={placeholder}
      className={`form-control ${className}`}
      />
    </div>
  )
}

export default CustomInput
