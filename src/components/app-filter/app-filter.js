import { useState } from 'react';
import './app-filter.scss';

const AppFilter = ({filter, onFilterSelect, onChangeSalatyFilter}) => {
    const [salaryValue, setSalaryValue] = useState(1000);

    const onValueChange = (e) => {
        const target = e.target.value.replace(/\D/g, '');
        setSalaryValue(target);
        onChangeSalatyFilter(target);
    }

    const filterSalary = <input 
                        className={`salary__input form-control${filter === "moreThen1000" ? ' salary__input_active' : '' }`}
                        type='text'
                        value={salaryValue}
                        onChange={onValueChange}/>;
    const buttonsData = [
        {name: 'all', label: 'All employees'},
        {name: 'rise', label: 'For promotion'},
        {name: 'moreThen1000', label: `Salary more then:`}

    ];

    const buttons = buttonsData.map(({name, label}, i) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
                <option
                    value={name}
                    className={`btn ${clazz}`}
                    type="button"
                    key={name}
                    >
                        {label}
                </option>
        )
    });

    const select = (
        <select className={'btn btn-light filter-select'} onChange={(e) => onFilterSelect(e.target.value)}>
            {buttons}
        </select>
    )

    return (
        <div className="btn-group">
            {select}
            {filterSalary}
        </div>
    )
}

export default AppFilter;