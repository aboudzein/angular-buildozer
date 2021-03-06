import { LoginComponent } from './login.component';
import { async, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { MaterialModule } from '@shared/common';
import { RegisterComponent } from '../register/register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { UserService } from '@shared/user';
import { TranslateTestingModule } from 'test/mocks';
import { asyncData, TestUtility } from 'test/fixture';
import { FormModule } from '@partials/form';
import { PortalModel } from '@shared/models';
import { TokenHelper } from '@core/helpers/token';

fdescribe('LoginComponent', () => {
    let component: LoginComponent;
    let testUtility: TestUtility<LoginComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                RegisterComponent
            ],
            imports: [
                BrowserAnimationsModule,
                MaterialModule,
                RouterTestingModule.withRoutes([]),
                FormModule,
                TranslateTestingModule
            ]
        }).compileComponents();
        testUtility = new TestUtility(LoginComponent)
        component = testUtility.fixture.componentInstance;
    }));


    Isolate(() => {
        fdescribe('Login', () => {
            let loginResponse: PortalModel.ILoginResponse;
            beforeEach(() => {
                loginResponse = { refreshToken: 'refreshToken', token: 'token' };
                spyOn(TestBed.inject(UserService), 'login').and.returnValue(asyncData(loginResponse));
                spyOn(TestBed.inject(TokenHelper), 'setToken');
                spyOn(TestBed.inject(Router), 'navigateByUrl');
            });
            test('FormIsNotValid_DoNothing')
                .Givin(() => ({ valid: false }))
                .When(({ valid }) => component.login({ valid, value: null }))
                .Then(() => expect(TestBed.inject(UserService).login).not.toHaveBeenCalled())

            test('FormIsValid_LogTheUserIn')
                .Givin(() => ({ value: { password: 'testPassword', username: 'testUsername' } }))
                .When(({ value }) => {
                    component.login({ valid: true, value });
                    return value;
                })
                .Then((value) => {
                    expect(TestBed.inject(UserService).login).toHaveBeenCalledWith(value);
                    expect(TestBed.inject(UserService).login).toHaveBeenCalledTimes(1);
                });


            describe('LoggedInSuccessfully', () => {
                test('ShouldSaveTheToken')
                    .Givin()
                    .When(() => component.login({ valid: true, value: null }))
                    .Then(() => {
                        flush();
                        expect(TestBed.inject(TokenHelper).setToken).toHaveBeenCalledWith(loginResponse.token, loginResponse.refreshToken, component.rememberMeCheckBox.value);
                    });
                test('ShouldNavigateToDefaultPage')
                    .Givin()
                    .When(() => component.login({ valid: true, value: null }))
                    .Then(() => {
                        flush();
                        expect(TestBed.inject(Router).navigateByUrl).toHaveBeenCalledWith(Constants.Routing.DEFAULT.withSlash);
                    });
            });
        });
    })
    describe('#ISOLATE', () => {
        // it.todo("Verify if a user will be able to login with a valid username and valid password.")
        // it.todo("Verify if a user cannot login with a valid username and an invalid password.")
        // it.todo("Verify the login page for both, when the field is blank and Submit button is clicked.")
        // it.todo("Verify the ‘Forgot Password’ functionality.")
        // it.todo("Verify the messages for invalid login.");
        // it.todo("Verify the ‘Remember Me’ functionality.")
        // it.todo("Verify if a user is able to login with a new password only after he/she has changed the password.")
        // it.todo("Verify if the ‘Enter’ key of the keyboard is working correctly on the login page.")
        // it('form should have password and username initial state as undefined with required as error', () => {
        //     expect(component.getControlValue('password')).toBeUndefined();
        //     expect(component.getControlValue('username')).toBeUndefined();
        //     expect(component.getControl('username').errors).toEqual({ required: true });
        //     expect(component.getControl('password').errors).toEqual({ required: true });
        // });

        // it('form should be valid when enter all requried field', (() => {
        //     component.form.setValue(fakeCreds);
        //     expect(component.form.valid).toBeTruthy();
        // }));

        // it('form should be invalid if password is missing', (() => {
        //     component.getControl('username').setValue(fakeCreds.username);
        //     expect(component.form.invalid).toBeTruthy();
        // }));

        // it('form should be invalid if username missing', (() => {
        //     component.getControl('password').setValue(fakeCreds.password);
        //     expect(component.form.invalid).toBeTruthy();
        // }));

    });

    // describe('[SHALLOW]', () => {
    //     const formElement = byQuerySelector('form');
    //     const usernameField = byQuerySelector<HTMLInputElement>(`#${component.getControl('username').id}`, byQuerySelector('form'));
    //     const passwordField = byQuerySelector<HTMLInputElement>(`#${component.getControl('password').id}`, byQuerySelector('form'));
    //     const rememberMeCheckbox = byQuerySelector<HTMLInputElement>(`#rememberMe`, byQuerySelector('form'));
    //     const registerButton = byQuerySelector(`#registerButton`);


    //     it('should create', () => {
    //         expect(component).toBeDefined();
    //     });

    //     it('should have a form widget associated with username and password inputs', () => {
    //         expect(formElement).toBeDefined();
    //         expect(usernameField).toBeDefined();
    //         expect(passwordField).toBeDefined();
    //         expect(rememberMeCheckbox).toBeDefined();
    //         expect(registerButton).toBeDefined();
    //     });

    //     it('have passowrd as obsecure type', () => {
    //         expect(passwordField.type).toMatch('password');
    //     });

    //     // TODO: move this test case to form widget component
    //     it('Should have the submit button as enabled after filling the form with valid values', () => {
    //         component.getControl('username').setValue(fakeCreds.username);
    //         component.getControl('password').setValue(fakeCreds.password);
    //         fixture.detectChanges();
    //         expect(byQuerySelector<HTMLButtonElement>('#submitButton').disabled).toBeFalsy();
    //     });

    // });

    // describe('[INTEGRATE]', () => {
    //     it('should call login method in userService after submitting the form', fakeAsync(() => {
    //         const userService = getService<UserService>(UserService);
    //         component.getControl('username').setValue(fakeCreds.username);
    //         component.getControl('password').setValue(fakeCreds.password);
    //         fixture.detectChanges();
    //         byQuerySelector('#submitButtons').click();
    //         expect(userService.login).toHaveBeenCalledTimes(1);
    //         expect(userService.login).toHaveBeenCalledWith(component.form.value);
    //     }));

    //     it('should redirect to app entry page after successed login', fakeAsync(() => {
    //         const navigateSpy = spyOn(getService<Router>(Router), 'navigateByUrl');
    //         spyUserService.login.and.returnValue(asyncData({ token: 'fakeJWTToken' } as any));
    //         component.getControl('username').setValue(fakeCreds.username);
    //         component.getControl('password').setValue(fakeCreds.password);
    //         fixture.detectChanges();
    //         byQuerySelector('#submitButton').click();
    //         tick();
    //         expect(navigateSpy).toHaveBeenCalledWith(Constants.Routing.Users.withSlash);
    //     }));
    //     // TODO: should verify that the localstorage has the token
    // });


});


function Isolate(specs: () => void) {
    describe('#ISOLATE', specs)
}



function test(expectation: string) {
    return {
        Givin: <T>(arrangement: () => T = () => ({} as T)) => {
            return {
                When: <R>(acting: (value: T) => R) => {
                    return {
                        Then: (assertion: (value: R) => void) => {
                            it(expectation, fakeAsync(() => {
                                assertion(acting((arrangement)()));
                            }));
                        }
                    }
                }
            }
        }
    }
}
