<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500" rel="stylesheet" type="text/css">
</head>

<body style="font-family: montserrat, sans-serif;">
<div style="max-width: 1000px; margin-left: auto; margin-right: auto;">
    <div style="text-align: center;">

    </div>

    <div>
        <div style="padding: 30px;">
            <div style="font-size: 20px;color: #242424;line-height: 30px;margin-bottom: 34px;">
            <span style="font-weight: bold;">
                Order Confirmation!
            </span> <br>

                <p style="font-size: 16px;color: #5E5E5E;line-height: 24px;">
                    Dear {{$customerName}},
                </p>

                <p style="font-size: 16px;color: #5E5E5E;line-height: 24px;">
                    Thanks for your Order <a href="http://tickettothemoon.dev.test/customer/account/orders/view/12"
                                             style="color: #0041FF; font-weight: bold;">#{{$orderId}}</a> placed
                    on {{$orderDate}}
                </p>
            </div>

            <div
                style="font-weight: bold;font-size: 20px;color: #242424;line-height: 30px;margin-bottom: 20px !important;">
                Summary of Order
            </div>

            <div
                style="display: flex;flex-direction: row;margin-top: 20px;justify-content: space-between;margin-bottom: 40px;">
                <div style="line-height: 25px;">
                    <div style="font-weight: bold;font-size: 16px;color: #242424;">
                        Shipping Address
                    </div>

                    <div>
                        {{$shippingAddress->city}}, {{$shippingAddress->state}}
                    </div>

                    <div>
                        {{$shippingAddress->name}}
                    </div>

                    <div>
                        {{$shippingAddress->street}}
                    </div>

                    <div>
                        Indonesia {{$shippingAddress->zip}}
                    </div>

                    <div>---</div>

                    <div style="margin-bottom: 40px;">
                        Contact : {{$shippingAddress->phone}}
                    </div>

                    <div style="font-size: 16px;color: #242424;">
                        Payment Method
                    </div>

                    <div style="font-weight: bold;font-size: 16px;color: #242424;">
                        {{$paymentMethod}}
                    </div>
                </div>

            </div>

            <div class="section-content">
                <div class="table mb-20">
                    <table style="overflow-x: auto; border-collapse: collapse;
                border-spacing: 0;width: 100%">
                        <thead>
                        <tr style="background-color: #f2f2f2">
                            <th style="text-align: left;padding: 8px">Product Name</th>
                            <th style="text-align: left;padding: 8px">Size</th>
                            <th style="text-align: left;padding: 8px">Qty</th>
                            <th style="text-align: left;padding: 8px">Price</th>
                            <th style="text-align: left;padding: 8px">Total Price</th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach($items as $item)
                            <tr>
                                <td data-value="productName"
                                    style="text-align: left;padding: 8px">{{ $item->productName }}</td>

                                <td data-value="size" style="text-align: left;padding: 8px">
                                    {{ $item->size }}

                                </td>

                                <td data-value="Qty" style="text-align: left;padding: 8px">{{ $item->quantity }}
                                </td>

                                <td data-value="price"
                                    style="text-align: left;padding: 8px">{{ "@".$item->price }}</td>

                                <td data-value="totalPrice"
                                    style="text-align: left;padding: 8px">{{ $item->price * $item->quantity}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="font-size: 14px;color: #242424;line-height: 30px;float: right;width: 60%;margin-top: 20px;">

                <div>
                    <span>Subtotal</span>
                    <span style="float: right;">
                    Rp. {{$price->sub_total}}.00
                </span>
                </div>

                <div>
                    <span>Shipping</span>
                    <span style="float: right;">
                        Rp. {{$price->shipping}}.00
                    </span>
                </div>

                <div style="font-weight: bold">
                    <span>Grand Total</span>
                    <span style="float: right;">
                    Rp. {{$price->total_price}}.00
                </span>
                </div>
            </div>

            <div style="margin-top: 65px;font-size: 16px;color: #5E5E5E;line-height: 24px;display: inline-block">
                <p style="font-size: 16px;color: #5E5E5E;line-height: 24px;">
                    Thanks for showing your interest in our store we will send you tracking number once it shipped
                </p>

                <p style="font-size: 16px;color: #5E5E5E;line-height: 24px;">
                    If you need any kind of help please contact us at <a style="color:#0041FF"
                                                                         href="{{'mailto:'.$senderEmail}}">{{$senderEmail}}</a>
                </p>

                <p style="font-size: 16px;color: #5E5E5E;line-height: 24px;">
                    Thanks!
                </p>
            </div>
        </div>


    </div>
</div>
</body>
</html>
