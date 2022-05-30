import { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            term: '',
            filter: 'all'
        };
        this.maxId = 10;
    }

    employeeService = new EmployeeService();

    componentDidMount() {
        this.dataFirebase();
    }

    componentDidUpdate() {
        this.employeeService.putData(this.state.data)
    }

    dataFirebase = () => {
        this.employeeService.getEmpData()
            .then(data => {
                this.setState(({
                    data :Object.values(data)
                }))
            })
        
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
        
    }

    addItem = (name, salary) => {
        const {data} = this.state;
        const newItem = {
            name,
            salary: +salary,
            increase: false,
            rise: false,
            id: data[data.length - 1].id + 1
        };
        this.employeeService.postData(newItem);
        this.setState(({data}) => {
            return {
                data: [...data, newItem]
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }));
    }

    onChangeSalary = (id, salaryChanged) => {
        salaryChanged = salaryChanged.replace(/\D/, '');
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: `${salaryChanged}`}
                }
                return item
            })
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0 ) {
            return items;
        }

        return items.filter(item => {
            return (item.name.toLowerCase()).indexOf(term.toLowerCase()) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        const msg = (
            <div>
                There are no such employees
            </div>
        )
        switch (filter) {
            case 'rise':
                return items.length > 0 ? items.filter(item => item.rise) : {msg};
            case 'moreThen1000': 
                return items.filter(item => item.salary > 999);
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        const totalSalary = data.length >= 1 ? data.map(emp => emp.salary).reduce((acc, cur) => +acc + +cur) : 0;

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}
                    totalSalary={totalSalary}/>
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter} 
                        onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm 
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;