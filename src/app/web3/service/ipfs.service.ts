import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMjc5Y2Y1YS1hOGMxLTRhNmEtYjk3Ny05ZjQzMDI4YmVjNzAiLCJlbWFpbCI6ImFndWlsZXJhbmljb2xhczE0ODdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJmY2Q1M2QwM2Y5OGUzMTcxOTI2Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzUxOGZhOWI0MTQ4Y2YwNTA4ZTNhNDM4N2JkNzc3NWRlZjgyNjQxNzYxODkwMmM2YzAxOTMzYjY2MWYyNDM1YiIsImlhdCI6MTY4NDg2MTkyOX0.rO7nE8qaWQdJGmHNWovloq7o-VPTbPo8MAZEFR7mkdw';

@Injectable({
    providedIn: 'root'
})
export class IPFSService {
    apiKey = '2fcd53d03f98e3171926';
    apiSecret = '3518fa9b4148cf0508e3a4387bd7775def826417618902c6c01933b661f2435b';

    constructor(private http: HttpClient) {}

    postFile(data: FormData) {
        return this.http.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            headers: {
                // 'Content-Type': `multipart/form-data; boundary=${data['']}`,
                // pinata_api_key: this.apiKey,
                // pinata_secret_api_key: this.apiSecret,
                'Authorization': token
              }
        })
    }
}