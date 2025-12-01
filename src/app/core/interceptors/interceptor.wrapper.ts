import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpInterceptorService } from './auth.interceptor';

export const httpInterceptorWrapper: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
    const interceptor = inject(HttpInterceptorService);
    return interceptor.intercept(req, {
        handle: next
    });
};