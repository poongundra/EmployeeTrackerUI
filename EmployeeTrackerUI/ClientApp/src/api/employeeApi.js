﻿import axios from 'axios';



export async function addEmployee(employeeRequestDto) {

    let baseUrl = 'http://localhost:1991';
    //let productionUrl = 'https://ccmd20221105194305.azurewebsites.net';

    return axios({
        method: 'post',
        url: baseUrl + '/api/Employees',
        data: JSON.parse(JSON.stringify(employeeRequestDto)), // you are sending body instead
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
export async function getEmployee() {

    let baseUrl = 'http://localhost:1991';
    //let productionUrl = 'https://ccmd20221105194305.azurewebsites.net';

    return axios({
        method: 'get',
        url: baseUrl + '/api/Employees',
        //data: JSON.parse(JSON.stringify(employeeRequestDto)), // you are sending body instead
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