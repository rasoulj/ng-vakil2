import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersianPipe } from '../_modules/pipes/persian.pipe';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
    override itemsPerPageLabel = PersianPipe.toPersian('items per page');
    // override nextPageLabel = 'Slijedeća stranica';
    // override previousPageLabel = 'Prethodna stranica';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 ${PersianPipe.toPersian('of')} ${length}`;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${PersianPipe.toPersian('of')} ${length}`;
    };
}