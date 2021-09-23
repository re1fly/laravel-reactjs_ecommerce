<?php

namespace App\Http\Controllers;

use App\Mail\EmailShipping;
use App\Models\Transactions;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller


{

    public function sendEmail()
    {
        $dataCheckout = Transactions::where('customer_id', '1')->latest('created_at')->first();
        $getUser = User::where('id', $dataCheckout->customer_id)->first();

        $mail = new EmailShipping();
        $mail->subject = "Your Item has been processed by our admin";
        $mail->orderId = $dataCheckout->order_id;
        $mail->customerName = $getUser->full_name;
        $mail->customerPhone = $getUser->phone;
        $mail->items = json_decode($dataCheckout->item_customer);
        $mail->shippingAddress = json_decode($dataCheckout->shipping_address);
        $mail->paymentMethod = $dataCheckout->payment_method;
        $mail->orderDate = $dataCheckout->created_at;
        $mail->price = json_decode($dataCheckout->price);
        $mail->year = Carbon::now()->year;
        Mail::to($getUser->email)->send($mail);

    }

    public function createTransactions(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
            'customer_id' => 'required',
            'item_customer' => 'required',
            'shipping_address' => 'required',
            'payment_method' => 'required',
            'price' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'validations' => $validator->errors(),
            ]);
        }

        $transactions = new Transactions();
        $transactions->order_id = $request->order_id;
        $transactions->customer_id = $request->customer_id;
        $transactions->item_customer = $request->item_customer;
        $transactions->shipping_address = $request->shipping_address;
        $transactions->payment_method = $request->payment_method;
        $transactions->price = $request->price;
        $transactions->save();

        $this->sendEmail();

        return response()->json([
            'success' => true,
            'transaction' => $transactions,
            'message' => 'Checkout Success'
        ]);
    }
}
