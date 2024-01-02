import { atom } from 'jotai';

export const paginationAtom = atom({
	currentPage: 1,
	perPage: 10,
});
