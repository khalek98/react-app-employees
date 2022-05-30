class EmployeeService {
    getResouce = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    postData = async (data) => {
        const res = await fetch('https://employees-khalek-default-rtdb.europe-west1.firebasedatabase.app/data.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res.json();
    };

    putData = async (data) => {
        const res = await fetch('https://employees-khalek-default-rtdb.europe-west1.firebasedatabase.app/data.json', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res.json();
    }

    getEmpData = async () => {
        const res = await this.getResouce('https://employees-khalek-default-rtdb.europe-west1.firebasedatabase.app/.json');
        return res.data;
    }

}

export default EmployeeService;