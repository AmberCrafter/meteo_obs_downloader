import {format} from "react-string-format";

const url_base: string = "https://k8s.ideasky.app"
const url: string = url_base + "/naho/api/v1/";

export const download_csv: (
    member_list: number[],
    starttime: string,
    endtime: string,
    mode: number,
    lab: number,
    token: string,
    flag: number
) => Promise<Response> = (
    member_list,
    starttime,
    endtime,
    mode,
    lab,
    token,
    flag
) => {
    let header = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let payload = {
        "member_list": member_list,
        "starttime": starttime,
        "endtime": endtime,
        "mode": mode,
        "lab": lab,
        "token": token,
        "flag": flag
    };

    let response = fetch(url + 'download_csv', {
        'method': 'POST',
        'body': JSON.stringify(payload),
        'headers': header
    });

    return response;
}
