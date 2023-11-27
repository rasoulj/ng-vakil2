import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersianPipe } from '../../pipes/persian.pipe';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
    override itemsPerPageLabel = PersianPipe.toPersian('items per page');

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 ${PersianPipe.toPersian('of')} ${length}`;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${PersianPipe.toPersian('of')} ${length}`;
    };
}