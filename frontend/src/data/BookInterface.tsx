export interface Book {
_id: string, 
title: string,
author: string,
description: string,
price: number,
isbn: string,
}
export interface CartProduct extends Book {
    quantity: number,
}

