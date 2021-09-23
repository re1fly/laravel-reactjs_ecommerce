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

    public function updateClothes(Request $request, $id)
    {
        $validator = $request->validate([
            'category' => 'required',
            'sub_category' => 'required',
            'gender' => 'required',
            'product_name' => 'required',
            'price' => 'required',
            'product_image' => 'required'
        ]);

        $clothes = Clothes::find($id);

        $clothes->product_name = $validator['product_name'];
        $clothes->gender = $validator['gender'];
        $clothes->category = $validator['category'];
        $clothes->sub_category = $validator['sub_category'];
        $clothes->price = $validator['price'];
        $clothes->save();

        return response()->json([
            'success' => true,
            'data' => $clothes,
            'message' => 'Update Success'
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

    public function getCloth($id)
    {
        $cloth = Clothes::find($id);

        return $cloth->toJson();
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

    public function getTshirts()
    {
        $data = Clothes::where('sub_category', 'tshirt')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }
    public function getJerseys()
    {
        $data = Clothes::where('sub_category', 'jersey')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getJackets()
    {
        $data = Clothes::where('sub_category', 'jacket')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getSweaters()
    {
        $data = Clothes::where('sub_category', 'sweater')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getHoodies()
    {
        $data = Clothes::where('sub_category', 'hoodie')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getShorts()
    {
        $data = Clothes::where('sub_category', 'shorts')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getPants()
    {
        $data = Clothes::where('sub_category', 'pants')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getLeggings()
    {
        $data = Clothes::where('sub_category', 'legging')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getSocks()
    {
        $data = Clothes::where('sub_category', 'socks')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getCaps()
    {
        $data = Clothes::where('sub_category', 'cap')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getBackpacks()
    {
        $data = Clothes::where('sub_category', 'backpack')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getSleeves()
    {
        $data = Clothes::where('sub_category', 'sleeve')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }

    public function getBalls()
    {
        $data = Clothes::where('sub_category', 'ball')->get();
        return response()->json([
            'success' => true,
            'list' => $data,
        ]);
    }



    public function deleteClothes($id)
    {
        $cloth = Clothes::find($id);
        if (!empty($cloth)) {
            $cloth->delete();
            $message = [
                'success' => true,
                'message' => 'Delete Product Success'
            ];
        } else {
            $message = [
                'success' => false,
                'message' => 'Delete Product Failed'
            ];
        }
        return response()->json($message);
    }


}
