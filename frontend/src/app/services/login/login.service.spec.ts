import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { RutHeadersService } from '../headers/rut-headers.service';

// describe('LoginService', () => {
//   let service: LoginService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(LoginService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('HttpClient testing', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    const loginService = new LoginService(httpClient);
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
      });
    });
    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
      });
    it('should be created', () => {
    const headersService = new RutHeadersService();
    const headers = headersService.rutHeaders('');
    expect(loginService).toBeDefined();
    });
    // it('can test HttpClient.get', () => {
    // const headersService = new RutHeadersService();
    // const headers = headersService.rutHeaders('');
    // // Make an HTTP GET request
    // httpClient.get<any>('http://localhost:25565/v1/login/loginrutindb', {headers})
    //     .subscribe(data =>
    //     // When observable resolves, result should match test data
    //     expect(data).toBeDefined()
    //     );
    
    // // The following `expectOne()` will match the request's URL.
    // // If no requests or multiple requests matched that URL
    // // `expectOne()` would throw.
    // const req = httpTestingController.expectOne('/data');
    
    // // Assert that the request is a GET.
    // expect(req.request.method).toEqual('GET');
    
    // // Respond with mock data, causing Observable to resolve.
    // // Subscribe callback asserts that correct data was returned.
    // // req.flush(testData);
    
    // // Finally, assert that there are no outstanding requests.
    // httpTestingController.verify();
    // });


  });
