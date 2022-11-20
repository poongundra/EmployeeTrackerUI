import axios from 'axios';
export async function addOnboarding(onboardingRequestDto) {

    let baseUrl = 'http://localhost:61522';
    let dockerUrl = 'http://localhost:9090';
    return axios({
        method: 'post',
        //url: baseUrl + '/api/Onboarding',
        url: dockerUrl + '/api/Onboarding',
        data: JSON.parse(JSON.stringify(onboardingRequestDto)), // you are sending body instead
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

export async function getOnboarding() {

    let baseUrl = 'http://localhost:61522';
    let dockerUrl = 'http://localhost:9090';

    return axios({
        method: 'get',
        //url: baseUrl + '/api/Onboarding',
        url: dockerUrl + '/api/Onboarding',
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