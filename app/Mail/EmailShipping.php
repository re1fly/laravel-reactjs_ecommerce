<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailShipping extends Mailable
{
    use Queueable, SerializesModels;
    public $customerName;
    public $orderId;
    public $items;
    public $customerPhone;
    public $shippingAddress;
    public $paymentMethod;
    public $orderDate;
    public $price;
    public $year;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
//        return $this->from('mailtest.compro@gmail.com')
//            ->view('email.email')
//            ->with([
//                    'customerName' => $this->customerName,
//                    ''
//                ]
//    );
        return $this
            ->from('refly@globalxtreme.net')
            ->view('email.email')
            ->with([
                'orderId' => $this->orderId,
                'customerName' => $this->customerName,
                'customerPhone' => $this->customerPhone,
                'senderEmail' => 'reflyfa@globalxtreme.net',
                'items' => $this->items,
                'shippingAddress' => $this->shippingAddress,
                'paymentMethod' => $this->paymentMethod,
                'orderDate' => $this->orderDate,
                'price' => $this->price,
                'year' => $this->year
            ]);
    }
}
