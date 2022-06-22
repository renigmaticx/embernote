import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../..';

export function GenerateAccessToken<T extends object>(
	payload: T,
	timeOut: string = '5h'
): string {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: timeOut });
}

export function GenerateRefreshToken<T extends object>(payload: T): string {
	return jwt.sign(payload, REFRESH_TOKEN_SECRET);
}

export function VerifyToken<T extends object>(
	token: string,
	tokenType: 'refresh' | 'access'
): T | undefined {
	try {
		if (tokenType === 'refresh')
			return jwt.verify(token, REFRESH_TOKEN_SECRET) as T;
		else return jwt.verify(token, ACCESS_TOKEN_SECRET) as T;
	} catch (error) {
		console.error(`Verify token exception ${error}`);
		return undefined;
	}
}
