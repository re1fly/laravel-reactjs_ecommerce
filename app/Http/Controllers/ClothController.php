<?php

namespace App\Http\Controllers;

use App\Models\Clothes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class ClothController extends Controller
{
    public function createClothes(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required',
            'sub_category' => 'required',
            'gender' => 'required',
            'product_name' => 'required',
            'price' => 'required',
            'product_image' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'validations' => $validator->errors(),
            ]);
        }

        $baseUrl = URL::to('storage');
        $path = $request->file('product_image')->store('public/cloth');
        $removePublic = str_replace('public', '', $path);

        $cloth = new Clothes();
        $cloth->category = $request->category;
        $cloth->sub_category = $request->sub_category;
        $cloth->gender = $request->gender;
        $cloth->product_name = $request->product_name;
        $cloth->price = $request->price;
        $cloth->product_image = $baseUrl . $removePublic;
        $cloth->save();


        return response()->json([
            'success' => true,
            'list' => $cloth
        ]);
    }

    public function getAllClothes()
    {
        $clothes = Clothes::all();
        return response()->json([
           'success' => true,
           'list' => $clothes
        ]);
    }

    public function getMenClothes()
    {
        $menClothes = Clothes::where('gender', 'men')->get();
        return response()->json([
            'success' => true,
            'list' => $menClothes
        ]);
    }

    public function getMenNewArrivals()
    {
        $menNewArrivals = Clothes::where('gender', 'men')->latest()->take(3)->get();
        return response()->json([
            'success' => true,
            'new_arrivals' => $menNewArrivals
        ]);
    }

    public function getWomenClothes()
    {
        $womenClothes = Clothes::where('gender', 'women')->get();
        return response()->json([
            'success' => true,
            'list' => $womenClothes
        ]);
    }

    public function getWomenNewArrivals()
    {
        $womenNewArrivals = Clothes::where('gender', 'women')->latest()->take(3)->get();
        return response()->json([
            'success' => true,
            'new_arrivals' => $womenNewArrivals
        ]);
    }

    public function getKidsClothes()
    {
        $kidsClothes = Clothes::where('gender', 'kids')->get();
        return response()->json([
            'success' => true,
            'list' => $kidsClothes
        ]);
    }

    public function getKidsNewArrivals()
    {
        $kidsNewArrivals = Clothes::where('gender', 'kids')->latest()->take(3)->get();
        return response()->json([
            'success' => true,
            'new_arrivals' => $kidsNewArrivals
        ]);
    }
}
