import axios from 'axios';
export async function addEmpAsset(empAssetRequestDto) {

    let baseUrl = 'https://localhost:44389';
    let dockerUrl = 'http://localhost:7070';

    return axios({
        method: 'post',
        url: dockerUrl + '/api/EmpAsset',
        data: JSON.parse(JSON.stringify(empAssetRequestDto)), // you are sending body instead
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        console.log(response);
        return response;
         
    })
        .catch(function (error) {
            console.log(error);
            return error;

        });
}
export async function getEmpAsset() {

    let baseUrl = 'https://localhost:44389';
    let dockerUrl = 'http://localhost:7070';

    return axios({
        method: 'get',
        url: dockerUrl + '/api/EmpAsset',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        console.log(response);
        return response;

    })
        .catch(function (error) {
            console.log(error);
            return error;

        });
}
export async function getEmployeeDetails() {

    let baseUrl = 'http://localhost:61522';
    let dockerUrl = 'http://localhost:9090';
    return axios({
        method: 'get',
        //url: baseUrl + '/api/Employees',
        url: dockerUrl + '/api/Employees',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        console.log(response);
        return response;

    })
        .catch(function (error) {
            console.log(error);
            return error;

        });
}