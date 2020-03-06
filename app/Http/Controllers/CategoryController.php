<?php

namespace App\Http\Controllers;

use App\Category;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class CategoryController extends Controller
{
    public function index(){
        $categories= Category::with('services')
            ->withCount('services')->get();
        return view('admin.services.categories')
            ->with('categories', $categories);
    }

    public function store(Request $request){
        $category_count= Category::where('name', $request->name)->count();
        if ($category_count){
            return "duplicate";
        }

        $category= new Category;
        $category->name= mb_strtoupper($request->name, 'utf-8');
        $category->description= mb_strtoupper($request->description, 'utf-8');

        if ($category->save()){
            return "success";
        }
    }

    public function update($id, Request $request){
        $category_count= Category::where('name', $request->name)
            ->where('id', '!=', $id)
            ->count();
        if ($category_count){
            return "duplicate";
        }

        $category= Category::where('id', $id)->first();
        if (!$category){
            return "error";
        }
        $category->name= mb_strtoupper($request->name_category, 'utf-8');
        $category->description= mb_strtoupper($request->description_category, 'utf-8');

        if ($category->save()){
            return "success";
        }
    }
}
